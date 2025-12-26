import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";
import logo from "@/assets/safe-packaging-logo.png";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, EyeOff } from "lucide-react";
import { useLoader } from "@react-three/fiber";

interface BagPreview3DProps {
  selectedTop: string;
  selectedLoop: string;
  selectedBottom: string;
  selectedConstruction: string;
  selectedFabric: string;
}

// Create a woven fabric texture procedurally
function createWovenTexture(baseColor: string, isDark: boolean = false): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Parse base color
  const tempColor = new THREE.Color(baseColor);
  const r = Math.floor(tempColor.r * 255);
  const g = Math.floor(tempColor.g * 255);
  const b = Math.floor(tempColor.b * 255);

  // Fill with base color
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Create woven pattern
  const weaveSize = 8;
  
  for (let y = 0; y < size; y += weaveSize) {
    for (let x = 0; x < size; x += weaveSize) {
      const isEven = ((x / weaveSize) + (y / weaveSize)) % 2 === 0;
      const variation = (Math.random() - 0.5) * 15;
      
      if (isEven) {
        // Horizontal thread
        ctx.fillStyle = `rgb(${Math.min(255, r + variation + 8)}, ${Math.min(255, g + variation + 8)}, ${Math.min(255, b + variation + 8)})`;
        ctx.fillRect(x, y + 1, weaveSize, weaveSize - 2);
      } else {
        // Vertical thread
        ctx.fillStyle = `rgb(${Math.max(0, r + variation - 5)}, ${Math.max(0, g + variation - 5)}, ${Math.max(0, b + variation - 5)})`;
        ctx.fillRect(x + 1, y, weaveSize - 2, weaveSize);
      }
    }
  }

  // Add subtle noise for realism
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha = Math.random() * 0.04;
    ctx.fillStyle = isDark ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 5);
  return texture;
}

// Create strap/loop texture
function createStrapTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Blue base
  ctx.fillStyle = '#1e40af';
  ctx.fillRect(0, 0, size, size);

  // Woven strap pattern
  for (let y = 0; y < size; y += 4) {
    const brightness = (y % 8 === 0) ? 30 : -10;
    ctx.fillStyle = `rgb(${30 + 64 + brightness}, ${64 + brightness}, ${175 + brightness})`;
    ctx.fillRect(0, y, size, 3);
  }

  // Add stitching lines on edges
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, 2, size);
  ctx.fillRect(size - 2, 0, 2, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Animated group wrapper for smooth transitions
function AnimatedGroup({ children, targetPosition = [0, 0, 0] as [number, number, number] }: { children: React.ReactNode; targetPosition?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(...targetPosition));

  useFrame(() => {
    if (groupRef.current) {
      currentPos.current.lerp(new THREE.Vector3(...targetPosition), 0.1);
      groupRef.current.position.copy(currentPos.current);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Fabric strap component for realistic loops
function FabricStrap({ 
  start, 
  end, 
  width = 0.08, 
  color = "#1e40af",
  curved = false 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  width?: number; 
  color?: string;
  curved?: boolean;
}) {
  const strapTexture = useMemo(() => createStrapTexture(), []);
  
  const geometry = useMemo(() => {
    const path = new THREE.LineCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    );
    
    if (curved) {
      const mid = [
        (start[0] + end[0]) / 2,
        Math.max(start[1], end[1]) + 0.15,
        (start[2] + end[2]) / 2
      ];
      const curvePath = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...start),
        new THREE.Vector3(mid[0], mid[1], mid[2]),
        new THREE.Vector3(...end)
      );
      return new THREE.TubeGeometry(curvePath, 12, width / 2, 6, false);
    }
    
    return new THREE.TubeGeometry(path, 4, width / 2, 6, false);
  }, [start, end, width, curved]);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial
        color={color}
        map={strapTexture}
        roughness={0.7}
        metalness={0.05}
      />
    </mesh>
  );
}

// Loop ring component
function LoopRing({ 
  position, 
  rotation = [0, 0, 0] as [number, number, number],
  radius = 0.12,
  tube = 0.025
}: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  radius?: number;
  tube?: number;
}) {
  const strapTexture = useMemo(() => createStrapTexture(), []);
  
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <torusGeometry args={[radius, tube, 12, 24]} />
      <meshStandardMaterial
        color="#1e40af"
        map={strapTexture}
        roughness={0.65}
        metalness={0.1}
      />
    </mesh>
  );
}

function Bag3DModel({ 
  selectedTop, 
  selectedLoop, 
  selectedBottom, 
  selectedConstruction,
  selectedFabric, 
  showLogo 
}: BagPreview3DProps & { showLogo: boolean }) {
  const bagRef = useRef<THREE.Group>(null);
  const logoTexture = useLoader(THREE.TextureLoader, logo);
  
  // Gentle rotation animation
  useFrame((state) => {
    if (bagRef.current) {
      bagRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  // Create fabric textures based on selection
  const fabricTexture = useMemo(() => {
    const colors: Record<string, string> = {
      "food-grade": "#fefefe",
      "coated": "#f5f5f0",
      "breathable": "#fafaf8",
      "standard": "#f8f8f6"
    };
    return createWovenTexture(colors[selectedFabric] || colors.standard);
  }, [selectedFabric]);

  // Fabric material with woven texture
  const fabricMaterial = useMemo(() => ({
    map: fabricTexture,
    color: "#ffffff",
    metalness: 0.02,
    roughness: 0.85,
    bumpScale: 0.02,
  }), [fabricTexture]);

  const isCircular = selectedConstruction === "circular";
  
  // Bag dimensions
  const bagWidth = 1.8;
  const bagHeight = 2.2;
  const bagDepth = 1.8;
  const radius = 0.9;

  // Create bag body mesh based on construction type
  const BagBody = () => {
    switch (selectedConstruction) {
      case "circular":
        return (
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[radius, radius * 0.95, bagHeight, 32]} />
            <meshStandardMaterial {...fabricMaterial} side={THREE.DoubleSide} />
          </mesh>
        );
      
      case "baffled":
        return (
          <group>
            {/* Main body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[bagWidth, bagHeight, bagDepth]} />
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Internal baffles visible through slight transparency */}
            {[-0.6, 0, 0.6].map((x, i) => (
              <mesh key={`baffle-x-${i}`} position={[x, 0, 0]} castShadow>
                <boxGeometry args={[0.02, bagHeight * 0.9, bagDepth * 0.85]} />
                <meshStandardMaterial color="#e8e8e8" transparent opacity={0.6} roughness={0.9} />
              </mesh>
            ))}
            {[-0.6, 0, 0.6].map((z, i) => (
              <mesh key={`baffle-z-${i}`} position={[0, 0, z]} castShadow>
                <boxGeometry args={[bagWidth * 0.85, bagHeight * 0.9, 0.02]} />
                <meshStandardMaterial color="#e8e8e8" transparent opacity={0.6} roughness={0.9} />
              </mesh>
            ))}
          </group>
        );
      
      case "u-panel":
        return (
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[bagWidth, bagHeight, bagDepth]} />
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* U-panel seams - only on 3 sides */}
            <FabricStrap 
              start={[bagWidth/2 + 0.01, -bagHeight/2, -bagDepth/2]} 
              end={[bagWidth/2 + 0.01, bagHeight/2, -bagDepth/2]} 
              width={0.03}
              color="#d0d0d0"
            />
            <FabricStrap 
              start={[-bagWidth/2 - 0.01, -bagHeight/2, -bagDepth/2]} 
              end={[-bagWidth/2 - 0.01, bagHeight/2, -bagDepth/2]} 
              width={0.03}
              color="#d0d0d0"
            />
            <FabricStrap 
              start={[-bagWidth/2, -bagHeight/2, bagDepth/2 + 0.01]} 
              end={[bagWidth/2, -bagHeight/2, bagDepth/2 + 0.01]} 
              width={0.03}
              color="#d0d0d0"
            />
          </group>
        );
      
      default: // 4-panel
        return (
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[bagWidth, bagHeight, bagDepth]} />
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Corner seams for 4-panel construction */}
            {[
              [bagWidth/2, bagDepth/2],
              [bagWidth/2, -bagDepth/2],
              [-bagWidth/2, bagDepth/2],
              [-bagWidth/2, -bagDepth/2]
            ].map(([x, z], i) => (
              <mesh key={`seam-${i}`} position={[x * 1.01, 0, z * 1.01]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, bagHeight, 8]} />
                <meshStandardMaterial color="#c8c8c8" roughness={0.8} />
              </mesh>
            ))}
          </group>
        );
    }
  };

  // Top configurations
  const BagTop = () => {
    const topY = bagHeight / 2;
    
    switch (selectedTop) {
      case "spout-top":
        return (
          <AnimatedGroup targetPosition={[0, topY, 0]}>
            {/* Top closure fabric */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              {isCircular ? (
                <cylinderGeometry args={[radius * 0.95, radius, 0.1, 32]} />
              ) : (
                <boxGeometry args={[bagWidth * 0.98, 0.1, bagDepth * 0.98]} />
              )}
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Spout collar */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.25, 0.1, 24]} />
              <meshStandardMaterial color="#1e40af" roughness={0.6} metalness={0.1} />
            </mesh>
            {/* Spout tube */}
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.2, 0.4, 24]} />
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Spout tie/cap */}
            <mesh position={[0, 0.55, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.15, 0.08, 16]} />
              <meshStandardMaterial color="#666666" roughness={0.5} metalness={0.2} />
            </mesh>
          </AnimatedGroup>
        );
      
      case "flap-top":
        return (
          <AnimatedGroup targetPosition={[0, topY, 0]}>
            {/* Flap cover */}
            <mesh position={[0, 0.08, 0]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
              {isCircular ? (
                <cylinderGeometry args={[radius * 1.05, radius * 1.05, 0.06, 32]} />
              ) : (
                <boxGeometry args={[bagWidth * 1.05, 0.06, bagDepth * 1.05]} />
              )}
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Flap edge binding */}
            <mesh position={[0, 0.08, isCircular ? 0 : bagDepth * 0.55]} castShadow>
              <boxGeometry args={[isCircular ? radius * 2 : bagWidth * 1.05, 0.04, 0.08]} />
              <meshStandardMaterial color="#1e40af" roughness={0.65} />
            </mesh>
          </AnimatedGroup>
        );
      
      case "duffle-top":
        return (
          <AnimatedGroup targetPosition={[0, topY, 0]}>
            {/* Gathered duffle fabric */}
            <mesh position={[0, 0.12, 0]} castShadow>
              <cylinderGeometry args={[0.35, isCircular ? radius * 0.9 : 0.75, 0.25, 24]} />
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Drawstring cord */}
            <mesh position={[0, 0.22, 0]} castShadow>
              <torusGeometry args={[0.32, 0.02, 8, 32]} />
              <meshStandardMaterial color="#1e40af" roughness={0.5} />
            </mesh>
            {/* Cord ends */}
            <mesh position={[0.35, 0.25, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
              <meshStandardMaterial color="#1e40af" roughness={0.5} />
            </mesh>
          </AnimatedGroup>
        );
      
      default: // open-top
        return (
          <AnimatedGroup targetPosition={[0, topY, 0]}>
            {/* Open top hem/reinforcement */}
            <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
              {isCircular ? (
                <torusGeometry args={[radius * 0.95, 0.04, 8, 32]} />
              ) : (
                <>
                  {/* Hem edges */}
                  {[
                    [0, 0, bagDepth/2], [0, 0, -bagDepth/2]
                  ].map(([x, y, z], i) => (
                    <mesh key={`hem-fb-${i}`} position={[x, y, z]} castShadow>
                      <boxGeometry args={[bagWidth, 0.06, 0.06]} />
                      <meshStandardMaterial color="#e5e5e5" roughness={0.8} />
                    </mesh>
                  ))}
                  {[
                    [bagWidth/2, 0, 0], [-bagWidth/2, 0, 0]
                  ].map(([x, y, z], i) => (
                    <mesh key={`hem-lr-${i}`} position={[x, y, z]} castShadow>
                      <boxGeometry args={[0.06, 0.06, bagDepth]} />
                      <meshStandardMaterial color="#e5e5e5" roughness={0.8} />
                    </mesh>
                  ))}
                </>
              )}
              <meshStandardMaterial color="#e5e5e5" roughness={0.8} />
            </mesh>
          </AnimatedGroup>
        );
    }
  };

  // Bottom configurations
  const BagBottom = () => {
    const bottomY = -bagHeight / 2;
    
    switch (selectedBottom) {
      case "spout":
        return (
          <AnimatedGroup targetPosition={[0, bottomY, 0]}>
            {/* Bottom panel */}
            <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
              {isCircular ? (
                <cylinderGeometry args={[radius, radius * 0.95, 0.1, 32]} />
              ) : (
                <boxGeometry args={[bagWidth * 0.98, 0.1, bagDepth * 0.98]} />
              )}
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Discharge spout collar */}
            <mesh position={[0, -0.15, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.22, 0.1, 24]} />
              <meshStandardMaterial color="#1e40af" roughness={0.6} metalness={0.1} />
            </mesh>
            {/* Discharge spout tube */}
            <mesh position={[0, -0.35, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.18, 0.35, 24]} />
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Spout tie */}
            <mesh position={[0, -0.5, 0]} castShadow>
              <torusGeometry args={[0.16, 0.025, 8, 24]} />
              <meshStandardMaterial color="#1e40af" roughness={0.5} />
            </mesh>
          </AnimatedGroup>
        );
      
      default: // plain bottom
        return (
          <AnimatedGroup targetPosition={[0, bottomY, 0]}>
            <mesh position={[0, -0.03, 0]} castShadow receiveShadow>
              {isCircular ? (
                <cylinderGeometry args={[radius * 0.98, radius * 0.98, 0.06, 32]} />
              ) : (
                <boxGeometry args={[bagWidth * 0.98, 0.06, bagDepth * 0.98]} />
              )}
              <meshStandardMaterial {...fabricMaterial} />
            </mesh>
            {/* Bottom reinforcement seams */}
            {!isCircular && (
              <>
                <mesh position={[0, -0.02, 0]} castShadow>
                  <boxGeometry args={[bagWidth * 0.9, 0.02, 0.04]} />
                  <meshStandardMaterial color="#d8d8d8" roughness={0.8} />
                </mesh>
                <mesh position={[0, -0.02, 0]} castShadow>
                  <boxGeometry args={[0.04, 0.02, bagDepth * 0.9]} />
                  <meshStandardMaterial color="#d8d8d8" roughness={0.8} />
                </mesh>
              </>
            )}
          </AnimatedGroup>
        );
    }
  };

  // Loop configurations with realistic fabric straps
  const BagLoops = () => {
    const topY = bagHeight / 2;
    const cornerOffset = isCircular ? radius * 0.7 : bagWidth / 2 - 0.1;
    
    switch (selectedLoop) {
      case "cross-corner":
        // Cross-corner loops: straps cross over the top corners
        return (
          <group>
            {[
              [cornerOffset, cornerOffset],
              [cornerOffset, -cornerOffset],
              [-cornerOffset, cornerOffset],
              [-cornerOffset, -cornerOffset]
            ].map(([x, z], i) => (
              <group key={`loop-${i}`}>
                {/* Loop ring at top */}
                <LoopRing position={[x * 0.85, topY + 0.35, z * 0.85]} rotation={[Math.PI / 2, 0, Math.atan2(z, x)]} radius={0.1} />
                {/* Straps going down to corners */}
                <FabricStrap 
                  start={[x * 0.85, topY + 0.25, z * 0.85]} 
                  end={[x, topY - 0.3, z]} 
                  curved 
                />
                <FabricStrap 
                  start={[x, topY - 0.3, z]} 
                  end={[x, -topY + 0.3, z]} 
                />
              </group>
            ))}
          </group>
        );
      
      case "corner-seam":
        // Corner seam loops: straps sewn into corner seams
        return (
          <group>
            {[
              [cornerOffset, cornerOffset],
              [cornerOffset, -cornerOffset],
              [-cornerOffset, cornerOffset],
              [-cornerOffset, -cornerOffset]
            ].map(([x, z], i) => (
              <group key={`loop-${i}`}>
                {/* Loop ring at corner */}
                <LoopRing position={[x, topY + 0.25, z]} rotation={[Math.PI / 2, 0, Math.atan2(z, x)]} radius={0.09} />
                {/* Single strap going straight down the seam */}
                <FabricStrap 
                  start={[x, topY + 0.15, z]} 
                  end={[x, -topY + 0.1, z]} 
                  width={0.06}
                />
              </group>
            ))}
          </group>
        );
      
      case "stevedore":
        // Stevedore straps: tunnel-style loops on two sides
        return (
          <group>
            {[1, -1].map((side, i) => (
              <group key={`stevedore-${i}`}>
                {/* Main tunnel strap */}
                <mesh position={[side * (isCircular ? radius + 0.08 : bagWidth/2 + 0.06), topY * 0.3, 0]} castShadow>
                  <boxGeometry args={[0.12, bagHeight * 0.65, 0.35]} />
                  <meshStandardMaterial color="#1e40af" roughness={0.7} />
                </mesh>
                {/* Tunnel opening for forklift */}
                <mesh position={[side * (isCircular ? radius + 0.12 : bagWidth/2 + 0.1), topY * 0.3, 0]} castShadow>
                  <boxGeometry args={[0.04, bagHeight * 0.3, 0.28]} />
                  <meshStandardMaterial color="#0f172a" roughness={0.9} />
                </mesh>
              </group>
            ))}
          </group>
        );
      
      case "sleeve":
        // Sleeve lifts: cylindrical sleeves on sides
        return (
          <group>
            {[1, -1].map((side, i) => (
              <group key={`sleeve-${i}`}>
                {/* Sleeve tube */}
                <mesh 
                  position={[side * (isCircular ? radius + 0.1 : bagWidth/2 + 0.08), topY * 0.4, 0]} 
                  rotation={[Math.PI / 2, 0, 0]} 
                  castShadow
                >
                  <cylinderGeometry args={[0.12, 0.12, bagDepth * 0.6, 16]} />
                  <meshStandardMaterial color="#1e40af" roughness={0.65} />
                </mesh>
                {/* Sleeve reinforcement straps */}
                <FabricStrap 
                  start={[side * (isCircular ? radius : bagWidth/2), topY, 0]} 
                  end={[side * (isCircular ? radius : bagWidth/2), -topY * 0.5, 0]} 
                  width={0.1}
                />
              </group>
            ))}
          </group>
        );
      
      case "single-point":
        // Single point lift: central lifting point with 4 straps
        return (
          <group>
            {/* Central lifting ring */}
            <LoopRing position={[0, topY + 0.5, 0]} rotation={[0, 0, 0]} radius={0.15} tube={0.03} />
            
            {/* Four straps converging to center */}
            {[
              [cornerOffset * 0.8, cornerOffset * 0.8],
              [cornerOffset * 0.8, -cornerOffset * 0.8],
              [-cornerOffset * 0.8, cornerOffset * 0.8],
              [-cornerOffset * 0.8, -cornerOffset * 0.8]
            ].map(([x, z], i) => (
              <group key={`strap-${i}`}>
                {/* Angled strap to center */}
                <FabricStrap 
                  start={[x, topY + 0.05, z]} 
                  end={[0, topY + 0.45, 0]} 
                  curved
                />
                {/* Vertical strap down the bag */}
                <FabricStrap 
                  start={[x, topY + 0.05, z]} 
                  end={[x, -topY + 0.2, z]} 
                />
              </group>
            ))}
          </group>
        );
      
      default:
        return null;
    }
  };

  return (
    <group ref={bagRef}>
      <BagBody />
      <BagTop />
      <BagBottom />
      <BagLoops />
      
      {/* Logo on front face */}
      {showLogo && (
        <mesh 
          position={isCircular ? [0, 0.3, radius + 0.01] : [0, 0.3, bagDepth/2 + 0.01]} 
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[0.55, 0.28]} />
          <meshStandardMaterial 
            map={logoTexture} 
            transparent 
            opacity={0.95}
            roughness={0.8}
          />
        </mesh>
      )}
    </group>
  );
}

export default function BagPreview3D(props: BagPreview3DProps) {
  const controlsRef = useRef<any>(null);
  const [showLogo, setShowLogo] = useState(true);
  
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const toggleLogo = () => {
    setShowLogo(!showLogo);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [4, 2.5, 4], fov: 40 }}
        shadows="soft"
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#f8fafc']} />
        
        {/* Enhanced lighting setup for realistic shadows */}
        <ambientLight intensity={0.35} />
        
        {/* Main key light */}
        <directionalLight 
          position={[6, 10, 8]} 
          intensity={1.4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={30}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0001}
        />
        
        {/* Fill light from side */}
        <directionalLight 
          position={[-5, 4, 6]} 
          intensity={0.6}
          color="#e8f4ff"
        />
        
        {/* Back rim light */}
        <directionalLight 
          position={[0, 3, -8]} 
          intensity={0.4}
          color="#fff8f0"
        />
        
        {/* Ground bounce light */}
        <directionalLight 
          position={[0, -5, 0]} 
          intensity={0.15}
          color="#f0f0f0"
        />
        
        {/* Hemisphere light for ambient fill */}
        <hemisphereLight 
          args={["#f0f8ff", "#c8d8e8", 0.4]} 
        />
        
        {/* Environment for reflections */}
        <Environment preset="studio" environmentIntensity={0.15} />
        
        {/* Ground plane for realistic shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
          <planeGeometry args={[25, 25]} />
          <shadowMaterial opacity={0.15} transparent />
        </mesh>
        
        {/* Subtle ground gradient */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.26, 0]}>
          <circleGeometry args={[4, 64]} />
          <meshBasicMaterial color="#f1f5f9" transparent opacity={0.5} />
        </mesh>
        
        <Bag3DModel {...props} showLogo={showLogo} />
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={9}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={0.6}
          zoomSpeed={0.8}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 8}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Control buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          onClick={toggleLogo}
          size="sm"
          variant="secondary"
          className="shadow-lg hover:scale-105 transition-transform backdrop-blur-sm bg-background/80"
          title={showLogo ? "Hide Logo" : "Show Logo"}
        >
          {showLogo ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
          Logo
        </Button>
        <Button
          onClick={resetView}
          size="sm"
          variant="secondary"
          className="shadow-lg hover:scale-105 transition-transform backdrop-blur-sm bg-background/80"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
      
      {/* Instructions overlay */}
      <div className="absolute top-3 left-3 text-xs text-muted-foreground/70 pointer-events-none">
        <span className="bg-background/60 backdrop-blur-sm px-2 py-1 rounded">
          3D Preview
        </span>
      </div>
    </div>
  );
}
