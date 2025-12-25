import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
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

  // Fabric material based on selection
  const getFabricMaterial = () => {
    const baseColor = selectedFabric === "food-grade" ? "#ffffff" 
                     : selectedFabric === "coated" ? "#f5f5f5"
                     : selectedFabric === "breathable" ? "#fafafa"
                     : "#f8f8f8";
    
    return {
      color: baseColor,
      metalness: 0.05,
      roughness: 0.85,
    };
  };

  const fabricMaterial = getFabricMaterial();
  const loopMaterial = { color: "#2563eb", metalness: 0.2, roughness: 0.6 };

  // Construction affects the bag body shape
  const getBagGeometry = () => {
    switch (selectedConstruction) {
      case "4-panel":
        // Standard 4-panel square bag
        return new THREE.BoxGeometry(1.8, 2.2, 1.8, 1, 1, 1);
      case "u-panel":
        // U-panel construction - slightly different proportions
        return new THREE.BoxGeometry(1.8, 2.2, 1.8, 1, 1, 1);
      case "circular":
        // Circular/round bag
        return new THREE.CylinderGeometry(0.9, 0.9, 2.2, 32);
      case "baffled":
        // Baffled bag - box with internal baffles (visualized with side details)
        return new THREE.BoxGeometry(1.8, 2.2, 1.8, 1, 1, 1);
      default:
        return new THREE.BoxGeometry(1.8, 2.2, 1.8, 1, 1, 1);
    }
  };

  const isCircular = selectedConstruction === "circular";
  const bagGeometry = getBagGeometry();

  return (
    <group ref={bagRef}>
      {/* Main bag body */}
      <mesh 
        geometry={bagGeometry} 
        position={[0, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...fabricMaterial} />
      </mesh>

      {/* Construction-specific details */}
      {selectedConstruction === "4-panel" && (
        <>
          {/* Vertical corner seams for 4-panel */}
          {[
            [0.9, 0.9], [0.9, -0.9], [-0.9, 0.9], [-0.9, -0.9]
          ].map(([x, z], i) => (
            <mesh key={`seam-${i}`} position={[x, 0, z]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 2.2, 8]} />
              <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
            </mesh>
          ))}
        </>
      )}

      {selectedConstruction === "u-panel" && (
        <>
          {/* U-panel has seams on three sides */}
          {[
            [0.9, 0], [-0.9, 0], [0, 0.9]
          ].map(([x, z], i) => (
            <mesh key={`u-seam-${i}`} position={[x, 0, z]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 2.2, 8]} />
              <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
            </mesh>
          ))}
        </>
      )}

      {selectedConstruction === "baffled" && (
        <>
          {/* Baffled bag - show internal baffle structure on sides */}
          {[0.85, -0.85].map((x, i) => (
            <mesh key={`baffle-${i}`} position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 2.0, 1.6]} />
              <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
            </mesh>
          ))}
          {[0.85, -0.85].map((z, i) => (
            <mesh key={`baffle-z-${i}`} position={[0, 0, z]} castShadow>
              <boxGeometry args={[1.6, 2.0, 0.05]} />
              <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
            </mesh>
          ))}
        </>
      )}

      {/* Logo on front face */}
      {showLogo && !isCircular && (
        <mesh position={[0.91, 0.3, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.5, 0.25]} />
          <meshStandardMaterial 
            map={logoTexture} 
            transparent 
            opacity={0.9}
            roughness={0.85}
          />
        </mesh>
      )}

      {showLogo && isCircular && (
        <mesh position={[0, 0.3, 0.91]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.5, 0.25]} />
          <meshStandardMaterial 
            map={logoTexture} 
            transparent 
            opacity={0.9}
            roughness={0.85}
          />
        </mesh>
      )}

      {/* Bag Top Configurations */}
      {selectedTop === "open-top" && (
        <group position={[0, 1.15, 0]}>
          <mesh castShadow receiveShadow>
            {isCircular ? (
              <cylinderGeometry args={[0.92, 0.92, 0.1, 32]} />
            ) : (
              <boxGeometry args={[1.85, 0.1, 1.85]} />
            )}
            <meshStandardMaterial color="#e5e5e5" roughness={0.8} />
          </mesh>
        </group>
      )}

      {selectedTop === "spout-top" && (
        <group position={[0, 1.2, 0]}>
          <mesh castShadow>
            {isCircular ? (
              <cylinderGeometry args={[0.25, 0.28, 0.15, 24]} />
            ) : (
              <boxGeometry args={[0.5, 0.15, 0.5]} />
            )}
            <meshStandardMaterial color="#d8d8d8" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 20]} />
            <meshStandardMaterial color="#c8c8c8" roughness={0.75} />
          </mesh>
        </group>
      )}

      {selectedTop === "flap-top" && (
        <group position={[0, 1.15, 0]}>
          <mesh rotation={[0, 0, 0]} castShadow receiveShadow>
            {isCircular ? (
              <cylinderGeometry args={[0.92, 0.92, 0.08, 32]} />
            ) : (
              <boxGeometry args={[1.9, 0.08, 1.9]} />
            )}
            <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
          </mesh>
        </group>
      )}

      {selectedTop === "duffle-top" && (
        <group position={[0, 1.2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.4, 0.85, 0.25, 32]} />
            <meshStandardMaterial color="#e5e5e5" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <torusGeometry args={[0.38, 0.03, 16, 32]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
        </group>
      )}

      {/* Loop Configurations */}
      {selectedLoop === "cross-corner" && (
        <group>
          {[
            [0.75, 0.75], [0.75, -0.75], [-0.75, 0.75], [-0.75, -0.75]
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 1.4, z]} castShadow>
              <torusGeometry args={[0.2, 0.04, 16, 32]} />
              <meshStandardMaterial {...loopMaterial} />
            </mesh>
          ))}
        </group>
      )}

      {selectedLoop === "corner-seam" && (
        <group>
          {[
            [0.9, 0.9], [0.9, -0.9], [-0.9, 0.9], [-0.9, -0.9]
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 1.4, z]} castShadow>
              <torusGeometry args={[0.18, 0.04, 16, 32]} />
              <meshStandardMaterial {...loopMaterial} />
            </mesh>
          ))}
        </group>
      )}

      {selectedLoop === "stevedore" && (
        <group>
          {[0.7, -0.7].map((x, i) => (
            <mesh key={i} position={[x, 1.3, 0]} castShadow>
              <boxGeometry args={[0.12, 0.5, 0.15]} />
              <meshStandardMaterial {...loopMaterial} />
            </mesh>
          ))}
        </group>
      )}

      {selectedLoop === "sleeve" && (
        <group>
          {[0.8, -0.8].map((x, i) => (
            <mesh key={i} position={[x, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.4, 20]} />
              <meshStandardMaterial {...loopMaterial} />
            </mesh>
          ))}
        </group>
      )}

      {selectedLoop === "single-point" && (
        <group>
          <mesh position={[0, 1.8, 0]} castShadow>
            <torusGeometry args={[0.15, 0.04, 16, 32]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
          {[
            [0.7, 0.7], [0.7, -0.7], [-0.7, 0.7], [-0.7, -0.7]
          ].map(([x, z], i) => {
            const length = Math.sqrt(x * x + z * z);
            const angle = Math.atan2(z, x);
            return (
              <mesh 
                key={i} 
                position={[x * 0.5, 1.5, z * 0.5]} 
                rotation={[Math.PI / 4, angle - Math.PI / 2, 0]}
                castShadow
              >
                <boxGeometry args={[0.05, length * 0.7, 0.05]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Bag Bottom Configurations */}
      {selectedBottom === "plain" && (
        <group position={[0, -1.15, 0]}>
          <mesh castShadow receiveShadow>
            {isCircular ? (
              <cylinderGeometry args={[0.92, 0.92, 0.1, 32]} />
            ) : (
              <boxGeometry args={[1.85, 0.1, 1.85]} />
            )}
            <meshStandardMaterial color="#d8d8d8" roughness={0.8} />
          </mesh>
        </group>
      )}

      {selectedBottom === "spout" && (
        <group position={[0, -1.2, 0]}>
          <mesh castShadow>
            {isCircular ? (
              <cylinderGeometry args={[0.25, 0.28, 0.15, 24]} />
            ) : (
              <boxGeometry args={[0.5, 0.15, 0.5]} />
            )}
            <meshStandardMaterial color="#c8c8c8" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 20]} />
            <meshStandardMaterial color="#b8b8b8" roughness={0.75} />
          </mesh>
        </group>
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
        camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
      >
        <color attach="background" args={['#fafafa']} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        
        <directionalLight 
          position={[8, 10, 6]} 
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        
        <directionalLight 
          position={[4, 5, 8]} 
          intensity={0.5}
        />
        
        <directionalLight 
          position={[-4, 3, -6]} 
          intensity={0.3}
        />
        
        <hemisphereLight 
          args={["#ffffff", "#b0b8c0", 0.25]} 
        />
        
        <Environment preset="apartment" environmentIntensity={0.2} />
        
        {/* Ground plane for shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.1} />
        </mesh>
        
        <Bag3DModel {...props} showLogo={showLogo} />
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={2.8}
          maxDistance={8}
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
