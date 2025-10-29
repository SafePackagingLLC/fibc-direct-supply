import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import logo from "@/assets/safe-packaging-logo.png";

interface BagPreview3DProps {
  selectedTop: string;
  selectedLoop: string;
  selectedBottom: string;
  selectedFabric: string;
}

function Bag3DModel({ selectedTop, selectedLoop, selectedBottom, selectedFabric }: BagPreview3DProps) {
  const bagRef = useRef<THREE.Group>(null);

  // Auto-rotate animation
  useFrame(() => {
    if (bagRef.current) {
      bagRef.current.rotation.y += 0.003;
    }
  });

  // Load logo texture
  const logoTexture = useLoader(THREE.TextureLoader, logo);

  // Determine fabric appearance based on selection
  const getFabricMaterial = () => {
    const baseProps = {
      metalness: 0.02,
      roughness: 0.85,
      envMapIntensity: 0.3,
    };

    switch (selectedFabric) {
      case "coated":
        return { color: "#f5f5f5", ...baseProps, roughness: 0.65, metalness: 0.05 };
      case "breathable":
        return { color: "#fafafa", ...baseProps, roughness: 0.92 };
      case "food-grade":
        return { color: "#ffffff", ...baseProps, roughness: 0.75, metalness: 0.03 };
      default:
        return { color: "#f8f8f8", ...baseProps };
    }
  };

  const fabricMaterial = getFabricMaterial();

  return (
    <group ref={bagRef}>
      {/* Main bag body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial {...fabricMaterial} />
      </mesh>

      {/* Logo on front face */}
      <mesh position={[0.751, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshStandardMaterial 
          map={logoTexture} 
          transparent 
          opacity={0.9}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Bag edges for definition */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 2, 1.5)]} />
        <lineBasicMaterial color="#cbd5e1" opacity={0.25} transparent />
      </lineSegments>

      {/* Top configuration */}
      {selectedTop === "open-top" && (
        <mesh position={[0, 1.05, 0]} castShadow>
          <cylinderGeometry args={[0.76, 0.76, 0.15, 32]} />
          <meshStandardMaterial 
            color="#e8e8e8"
            metalness={0.05} 
            roughness={0.8}
          />
        </mesh>
      )}
      {selectedTop === "spout-top" && (
        <group position={[0, 1.1, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
            <meshStandardMaterial 
              color="#d0d0d0"
              metalness={0.08} 
              roughness={0.7}
            />
          </mesh>
          <mesh position={[0, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
            <meshStandardMaterial 
              color="#b8b8b8"
              metalness={0.1} 
              roughness={0.6}
            />
          </mesh>
        </group>
      )}
      {selectedTop === "flap-top" && (
        <mesh position={[0, 1.08, 0]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.85, 0.08, 0.85]} />
          <meshStandardMaterial 
            color="#d5d5d5"
            metalness={0.04} 
            roughness={0.75}
          />
        </mesh>
      )}
      {selectedTop === "duffle-top" && (
        <mesh position={[0, 1.15, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.76, 0.25, 32]} />
          <meshStandardMaterial 
            color="#dadada"
            metalness={0.03} 
            roughness={0.82}
          />
        </mesh>
      )}

      {/* Loop configuration */}
      {selectedLoop === "cross-corner" && (
        <>
          <mesh position={[0.8, 1.35, 0.8]} castShadow>
            <torusGeometry args={[0.16, 0.035, 16, 32]} />
            <meshStandardMaterial 
              color="#2563eb"
              metalness={0.15} 
              roughness={0.75}
            />
          </mesh>
          <mesh position={[-0.8, 1.35, -0.8]} castShadow>
            <torusGeometry args={[0.16, 0.035, 16, 32]} />
            <meshStandardMaterial 
              color="#2563eb"
              metalness={0.15} 
              roughness={0.75}
            />
          </mesh>
        </>
      )}
      {selectedLoop === "corner-seam" && (
        <>
          {[0.8, -0.8].map((x, i) =>
            [0.8, -0.8].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.35, z]} castShadow>
                <torusGeometry args={[0.14, 0.035, 16, 32]} />
                <meshStandardMaterial 
                  color="#2563eb"
                  metalness={0.15} 
                  roughness={0.75}
                />
              </mesh>
            ))
          )}
        </>
      )}
      {selectedLoop === "stevedore" && (
        <group position={[0, 1.35, 0]}>
          <mesh position={[0.6, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.12]} />
            <meshStandardMaterial 
              color="#2563eb"
              metalness={0.15} 
              roughness={0.75}
            />
          </mesh>
          <mesh position={[-0.6, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.12]} />
            <meshStandardMaterial 
              color="#2563eb"
              metalness={0.15} 
              roughness={0.75}
            />
          </mesh>
        </group>
      )}
      {selectedLoop === "sleeve" && (
        <>
          {[0.6, -0.6].map((x, i) => (
            <mesh key={i} position={[x, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.09, 0.09, 0.35, 16]} />
              <meshStandardMaterial 
                color="#2563eb"
                metalness={0.15} 
                roughness={0.75}
              />
            </mesh>
          ))}
        </>
      )}
      {selectedLoop === "single-point" && (
        <>
          <mesh position={[0, 1.6, 0]} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color="#2563eb"
              metalness={0.15} 
              roughness={0.75}
            />
          </mesh>
          {[0.4, -0.4].map((x, i) =>
            [0.4, -0.4].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.45, z]} rotation={[0, 0, Math.atan2(z, x)]} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
                <meshStandardMaterial 
                  color="#2563eb"
                  metalness={0.15} 
                  roughness={0.75}
                />
              </mesh>
            ))
          )}
        </>
      )}

      {/* Bottom configuration */}
      {selectedBottom === "plain" && (
        <mesh position={[0, -1.025, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 1.5]} />
          <meshStandardMaterial 
            color="#d8d8d8"
            metalness={0.05} 
            roughness={0.8}
          />
        </mesh>
      )}
      {selectedBottom === "spout" && (
        <group position={[0, -1.15, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
            <meshStandardMaterial 
              color="#c8c8c8"
              metalness={0.08} 
              roughness={0.7}
            />
          </mesh>
          <mesh position={[0, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
            <meshStandardMaterial 
              color="#b0b0b0"
              metalness={0.1} 
              roughness={0.6}
            />
          </mesh>
        </group>
      )}
      {selectedBottom === "open" && (
        <mesh position={[0, -1.025, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <ringGeometry args={[0.45, 0.76, 32]} />
          <meshStandardMaterial 
            color="#d0d0d0"
            metalness={0.06} 
            roughness={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default function BagPreview3D(props: BagPreview3DProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg">
      <Canvas
        camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Enhanced lighting setup for realistic FIBC appearance */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-5, 6, -5]} intensity={0.7} />
        <pointLight position={[0, 6, 3]} intensity={0.4} />
        <hemisphereLight args={["#ffffff", "#b0b0b0", 0.3]} />
        
        <Bag3DModel {...props} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
