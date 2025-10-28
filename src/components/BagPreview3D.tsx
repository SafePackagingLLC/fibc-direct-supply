import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

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

  // Determine fabric appearance based on selection
  const getFabricMaterial = () => {
    const baseProps = {
      metalness: 0.05,
      roughness: 0.8,
      envMapIntensity: 0.5,
    };

    switch (selectedFabric) {
      case "coated":
        return { color: "#f8f9fa", ...baseProps, roughness: 0.6 };
      case "breathable":
        return { color: "#ffffff", ...baseProps, roughness: 0.9 };
      case "food-grade":
        return { color: "#fefefe", ...baseProps, roughness: 0.7 };
      default:
        return { color: "#ffffff", ...baseProps };
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
      
      {/* Bag edges for definition */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 2, 1.5)]} />
        <lineBasicMaterial color="#94a3b8" opacity={0.3} transparent />
      </lineSegments>

      {/* Top configuration */}
      {selectedTop === "open-top" && (
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.76, 0.76, 0.1, 32]} />
          <meshStandardMaterial 
            color="hsl(217, 91%, 60%)" 
            metalness={0.2} 
            roughness={0.5}
          />
        </mesh>
      )}
      {selectedTop === "spout-top" && (
        <group position={[0, 1.1, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
            <meshStandardMaterial 
              color="hsl(217, 91%, 60%)" 
              metalness={0.2} 
              roughness={0.5}
            />
          </mesh>
        </group>
      )}
      {selectedTop === "flap-top" && (
        <mesh position={[0, 1.05, 0]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 0.8]} />
          <meshStandardMaterial 
            color="hsl(217, 91%, 60%)" 
            metalness={0.2} 
            roughness={0.5}
          />
        </mesh>
      )}
      {selectedTop === "duffle-top" && (
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.76, 0.2, 32]} />
          <meshStandardMaterial 
            color="hsl(217, 91%, 60%)" 
            metalness={0.2} 
            roughness={0.5}
          />
        </mesh>
      )}

      {/* Loop configuration */}
      {selectedLoop === "cross-corner" && (
        <>
          <mesh position={[0.8, 1.3, 0.8]} castShadow>
            <torusGeometry args={[0.15, 0.03, 16, 32]} />
            <meshStandardMaterial 
              color="hsl(215, 25%, 27%)" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
          <mesh position={[-0.8, 1.3, -0.8]} castShadow>
            <torusGeometry args={[0.15, 0.03, 16, 32]} />
            <meshStandardMaterial 
              color="hsl(215, 25%, 27%)" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
        </>
      )}
      {selectedLoop === "corner-seam" && (
        <>
          {[0.8, -0.8].map((x, i) =>
            [0.8, -0.8].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.3, z]} castShadow>
                <torusGeometry args={[0.12, 0.03, 16, 32]} />
                <meshStandardMaterial 
                  color="hsl(215, 25%, 27%)" 
                  metalness={0.1} 
                  roughness={0.8}
                />
              </mesh>
            ))
          )}
        </>
      )}
      {selectedLoop === "stevedore" && (
        <group position={[0, 1.3, 0]}>
          <mesh position={[0.6, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.4, 0.1]} />
            <meshStandardMaterial 
              color="hsl(215, 25%, 27%)" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
          <mesh position={[-0.6, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.4, 0.1]} />
            <meshStandardMaterial 
              color="hsl(215, 25%, 27%)" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
        </group>
      )}
      {selectedLoop === "sleeve" && (
        <>
          {[0.6, -0.6].map((x, i) => (
            <mesh key={i} position={[x, 1.3, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
              <meshStandardMaterial 
                color="hsl(215, 25%, 27%)" 
                metalness={0.1} 
                roughness={0.8}
              />
            </mesh>
          ))}
        </>
      )}
      {selectedLoop === "single-point" && (
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial 
            color="hsl(215, 25%, 27%)" 
            metalness={0.1} 
            roughness={0.8}
          />
        </mesh>
      )}

      {/* Bottom configuration */}
      {selectedBottom === "plain" && (
        <mesh position={[0, -1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          <meshStandardMaterial 
            color="hsl(217, 91%, 60%)" 
            metalness={0.2} 
            roughness={0.5}
          />
        </mesh>
      )}
      {selectedBottom === "spout" && (
        <group position={[0, -1.1, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
            <meshStandardMaterial 
              color="hsl(217, 91%, 60%)" 
              metalness={0.2} 
              roughness={0.5}
            />
          </mesh>
        </group>
      )}
      {selectedBottom === "open" && (
        <mesh position={[0, -1, 0]} castShadow>
          <ringGeometry args={[0.5, 0.76, 32]} />
          <meshStandardMaterial 
            color="hsl(217, 91%, 60%)" 
            metalness={0.2} 
            roughness={0.5}
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
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.3} />
        
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
