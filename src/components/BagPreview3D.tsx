import { useRef, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import logo from "@/assets/safe-packaging-logo.png";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, EyeOff } from "lucide-react";

interface BagPreview3DProps {
  selectedTop: string;
  selectedLoop: string;
  selectedBottom: string;
  selectedFabric: string;
}

interface AnimatedMeshProps {
  children: React.ReactNode;
  show: boolean;
}

function AnimatedMesh({ children, show }: AnimatedMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(show ? 1 : 0);

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setOpacity((prev) => {
        const target = show ? 1 : 0;
        const delta = (target - prev) * 0.15;
        if (Math.abs(delta) < 0.01) return target;
        animationFrame = requestAnimationFrame(animate);
        return prev + delta;
      });
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [show]);

  return (
    <group ref={groupRef} visible={opacity > 0.01}>
      {children}
    </group>
  );
}

interface Bag3DModelProps extends BagPreview3DProps {
  showLogo: boolean;
}

function Bag3DModel({ selectedTop, selectedLoop, selectedBottom, selectedFabric, showLogo }: Bag3DModelProps) {
  const bagRef = useRef<THREE.Group>(null);

  // Load logo texture
  const logoTexture = useLoader(THREE.TextureLoader, logo);

  // Woven polypropylene fabric material with matte finish
  const getFabricMaterial = () => {
    const baseProps = {
      metalness: 0.02,
      roughness: 0.85,
      envMapIntensity: 0.3,
    };

    switch (selectedFabric) {
      case "coated":
        return { color: "#fafafa", ...baseProps, roughness: 0.75, metalness: 0.04, envMapIntensity: 0.4 };
      case "breathable":
        return { color: "#fcfcfc", ...baseProps, roughness: 0.9, metalness: 0.01 };
      case "food-grade":
        return { color: "#ffffff", ...baseProps, roughness: 0.8, metalness: 0.03, envMapIntensity: 0.35 };
      default:
        return { color: "#f8f8f8", ...baseProps };
    }
  };

  const fabricMaterial = getFabricMaterial();

  // Blue loop/strap material with subtle sheen
  const loopMaterial = {
    color: "#3b82f6",
    metalness: 0.15,
    roughness: 0.7,
    envMapIntensity: 0.5,
  };

  // Create square bag with rounded edges and bowed sides
  const createBagGeometry = () => {
    const geometry = new THREE.BoxGeometry(1.6, 2, 1.6, 32, 32, 32);
    const positions = geometry.attributes.position;
    
    // Add subtle bow to sidewalls
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      const isVerticalEdge = Math.abs(Math.abs(x) - 0.8) < 0.01 || Math.abs(Math.abs(z) - 0.8) < 0.01;
      if (isVerticalEdge) {
        const bowAmount = 0.08 * (1 - Math.abs(y));
        const angle = Math.atan2(z, x);
        positions.setX(i, x + Math.cos(angle) * bowAmount);
        positions.setZ(i, z + Math.sin(angle) * bowAmount);
      }
    }
    
    geometry.computeVertexNormals();
    return geometry;
  };

  return (
    <group ref={bagRef}>
      {/* Main square bag body with bowed sidewalls */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow geometry={createBagGeometry()}>
        <meshStandardMaterial {...fabricMaterial} />
      </mesh>

      {/* Vertical corner seams */}
      {[
        [0.8, 0.8], [0.8, -0.8], [-0.8, 0.8], [-0.8, -0.8]
      ].map(([x, z], i) => (
        <mesh key={`seam-${i}`} position={[x, 0, z]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 2.05, 8]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.8} metalness={0.05} />
        </mesh>
      ))}

      {/* Safe Packaging logo on front face */}
      {showLogo && (
        <mesh position={[0.81, 0.2, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshStandardMaterial 
            map={logoTexture} 
            transparent 
            opacity={0.9}
            roughness={0.85}
            metalness={0.02}
          />
        </mesh>
      )}

      {/* Top configurations with animations */}
      <AnimatedMesh show={selectedTop === "open-top"}>
        <group position={[0, 1.05, 0]}>
          {/* Square open mouth with hem edge */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.65, 0.12, 1.65]} />
            <meshStandardMaterial 
              color="#e8e8e8"
              metalness={0.02} 
              roughness={0.8}
              envMapIntensity={0.3}
            />
          </mesh>
          {/* Inner hem detail */}
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[1.5, 0.04, 1.5]} />
            <meshStandardMaterial color="#d5d5d5" roughness={0.85} metalness={0.02} />
          </mesh>
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedTop === "spout-top"}>
        <group position={[0, 1.1, 0]}>
          {/* Stitched collar base */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.28, 0.15, 24]} />
            <meshStandardMaterial 
              color="#e0e0e0"
              metalness={0.02} 
              roughness={0.82}
              envMapIntensity={0.3}
            />
          </mesh>
          {/* Central filling spout */}
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 20]} />
            <meshStandardMaterial 
              color="#d0d0d0"
              metalness={0.03} 
              roughness={0.78}
              envMapIntensity={0.35}
            />
          </mesh>
          {/* Spout opening */}
          <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.13, 0.12, 16]} />
            <meshStandardMaterial 
              color="#c0c0c0"
              metalness={0.04} 
              roughness={0.75}
              envMapIntensity={0.4}
            />
          </mesh>
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedTop === "flap-top"}>
        <group position={[0, 1.08, 0]}>
          {/* Flat flap lid with rounded corners */}
          <mesh rotation={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.7, 0.1, 1.7]} />
            <meshStandardMaterial 
              color="#e5e5e5"
              metalness={0.02} 
              roughness={0.82}
              envMapIntensity={0.3}
            />
          </mesh>
          {/* Corner seam stitching */}
          {[
            [0.82, 0.82], [0.82, -0.82], [-0.82, 0.82], [-0.82, -0.82]
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 0.055, z]}>
              <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
              <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.1} />
            </mesh>
          ))}
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedTop === "duffle-top"}>
        <group position={[0, 1.12, 0]}>
          {/* Gathered fabric skirt with wrinkles */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.82, 0.3, 32]} />
            <meshStandardMaterial 
              color="#e8e8e8"
              metalness={0.02} 
              roughness={0.88}
              envMapIntensity={0.25}
            />
          </mesh>
          {/* Drawstring collar */}
          <mesh position={[0, 0.18, 0]}>
            <torusGeometry args={[0.38, 0.03, 16, 32]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.15} />
          </mesh>
        </group>
      </AnimatedMesh>

      {/* Loop configurations with animations */}
      <AnimatedMesh show={selectedLoop === "cross-corner"}>
        <group>
          {/* Four corner loops crossing diagonally */}
          {[
            [0.7, 0.7], [0.7, -0.7], [-0.7, 0.7], [-0.7, -0.7]
          ].map(([x, z], i) => (
            <group key={i} position={[x, 1.35, z]}>
              <mesh castShadow receiveShadow>
                <torusGeometry args={[0.18, 0.045, 20, 32]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
              {/* Diagonal straps */}
              <mesh position={[x > 0 ? -0.15 : 0.15, 0, z > 0 ? -0.15 : 0.15]} rotation={[0, Math.atan2(z, x), 0]}>
                <boxGeometry args={[0.4, 0.05, 0.08]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            </group>
          ))}
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedLoop === "corner-seam"}>
        <group>
          {/* Loops sewn into vertical corner seams */}
          {[0.7, -0.7].map((x, i) =>
            [0.7, -0.7].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.35, z]} castShadow receiveShadow>
                <torusGeometry args={[0.16, 0.045, 20, 32]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            ))
          )}
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedLoop === "stevedore"}>
        <group position={[0, 1.35, 0]}>
          {/* Two parallel straps for side lifting */}
          {[0.6, -0.6].map((x, i) => (
            <group key={i}>
              <mesh position={[x, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 0.6, 0.16]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
              {/* Corner connections */}
              <mesh position={[x, 0.3, 0.6]} castShadow>
                <boxGeometry args={[0.1, 0.08, 0.16]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
              <mesh position={[x, 0.3, -0.6]} castShadow>
                <boxGeometry args={[0.1, 0.08, 0.16]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            </group>
          ))}
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedLoop === "sleeve"}>
        <group>
          {/* Two wide sleeves on opposite sides */}
          {[0.65, -0.65].map((x, i) => (
            <group key={i} position={[x, 1.1, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.12, 0.12, 0.5, 20]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
              {/* Reinforcement at ends */}
              <mesh position={[0, 0.35, 0]}>
                <boxGeometry args={[0.25, 0.08, 0.25]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            </group>
          ))}
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedLoop === "single-point"}>
        <group>
          {/* Central lifting ring */}
          <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
            <torusGeometry args={[0.15, 0.04, 20, 32]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
          {/* Four converging straps */}
          {[
            [0.6, 0.6], [0.6, -0.6], [-0.6, 0.6], [-0.6, -0.6]
          ].map(([x, z], i) => {
            const angle = Math.atan2(z, x);
            const length = Math.sqrt(0.6 * 0.6 + 0.6 * 0.6);
            return (
              <mesh 
                key={i} 
                position={[x / 2, 1.5, z / 2]} 
                rotation={[Math.PI / 4, angle - Math.PI / 2, 0]}
                castShadow
              >
                <boxGeometry args={[0.06, length, 0.06]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            );
          })}
        </group>
      </AnimatedMesh>

      {/* Bottom configurations with animations */}
      <AnimatedMesh show={selectedBottom === "plain"}>
        <group position={[0, -1.025, 0]}>
          {/* Flat closed base with stitched edges */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.65, 0.12, 1.65]} />
            <meshStandardMaterial 
              color="#e0e0e0"
              metalness={0.02} 
              roughness={0.82}
              envMapIntensity={0.3}
            />
          </mesh>
          {/* Edge stitching */}
          {[
            [0.78, 0], [-0.78, 0], [0, 0.78], [0, -0.78]
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 0, z]} rotation={i < 2 ? [0, 0, Math.PI / 2] : [0, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, i < 2 ? 1.6 : 1.6, 8]} />
              <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.1} />
            </mesh>
          ))}
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedBottom === "spout"}>
        <group position={[0, -1.12, 0]}>
          {/* Stitched collar with light sag */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.28, 0.15, 24]} />
            <meshStandardMaterial 
              color="#d8d8d8"
              metalness={0.02} 
              roughness={0.82}
              envMapIntensity={0.3}
            />
          </mesh>
          {/* Discharge spout */}
          <mesh position={[0, -0.22, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 20]} />
            <meshStandardMaterial 
              color="#c8c8c8"
              metalness={0.03} 
              roughness={0.78}
              envMapIntensity={0.35}
            />
          </mesh>
          {/* Spout opening */}
          <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.13, 0.12, 16]} />
            <meshStandardMaterial 
              color="#b8b8b8"
              metalness={0.04} 
              roughness={0.75}
              envMapIntensity={0.4}
            />
          </mesh>
        </group>
      </AnimatedMesh>

      <AnimatedMesh show={selectedBottom === "open"}>
        <group position={[0, -1.025, 0]}>
          {/* Full panel door frame with reinforcement straps */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <ringGeometry args={[0.5, 0.82, 4]} />
            <meshStandardMaterial 
              color="#d5d5d5"
              metalness={0.02} 
              roughness={0.8}
              envMapIntensity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Blue reinforcement straps */}
          {[0, Math.PI / 2].map((angle, i) => (
            <mesh key={i} rotation={[Math.PI / 2, angle, 0]}>
              <boxGeometry args={[1.4, 0.08, 0.02]} />
              <meshStandardMaterial {...loopMaterial} />
            </mesh>
          ))}
          {/* Corner folds */}
          {[
            [0.6, 0.6], [0.6, -0.6], [-0.6, 0.6], [-0.6, -0.6]
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.12, 0.12, 0.04]} />
              <meshStandardMaterial color="#e5e5e5" roughness={0.85} metalness={0.02} />
            </mesh>
          ))}
        </group>
      </AnimatedMesh>
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
        camera={{ position: [3.2, 2.2, 3.2], fov: 40 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
      >
        <color attach="background" args={['#fafafa']} />
        
        {/* Soft 3-point studio lighting */}
        <ambientLight intensity={0.35} />
        
        {/* Key light - main illumination top-left */}
        <directionalLight 
          position={[7, 10, 5]} 
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-bias={-0.00005}
        />
        
        {/* Fill light - soft illumination front-right */}
        <directionalLight 
          position={[5, 6, 8]} 
          intensity={0.6}
        />
        
        {/* Rim light - subtle highlight from rear */}
        <directionalLight 
          position={[-4, 4, -6]} 
          intensity={0.35}
        />
        
        {/* Soft hemispheric ambient */}
        <hemisphereLight 
          args={["#ffffff", "#b0b8c0", 0.3]} 
        />
        
        {/* Subtle environment reflections */}
        <Environment preset="apartment" environmentIntensity={0.25} />
        
        {/* Ground plane for soft shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.12} />
        </mesh>
        
        <Bag3DModel {...props} showLogo={showLogo} />
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={7}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minPolarAngle={Math.PI / 6}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Control buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          onClick={toggleLogo}
          size="sm"
          variant="secondary"
          className="shadow-lg hover:scale-105 transition-transform"
          title={showLogo ? "Hide Logo" : "Show Logo"}
        >
          {showLogo ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
          Logo
        </Button>
        <Button
          onClick={resetView}
          size="sm"
          variant="secondary"
          className="shadow-lg hover:scale-105 transition-transform"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
