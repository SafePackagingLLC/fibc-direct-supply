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

  // Determine fabric color based on selection
  const getFabricColor = () => {
    switch (selectedFabric) {
      case "coated":
        return "#e0e0e0";
      case "breathable":
        return "#f5f5f5";
      case "food-grade":
        return "#fafafa";
      default:
        return "#ffffff";
    }
  };

  return (
    <group ref={bagRef}>
      {/* Main bag body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial 
          color={getFabricColor()} 
          metalness={0.1} 
          roughness={0.7}
        />
      </mesh>

      {/* Top configuration */}
      {selectedTop === "open-top" && (
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.1, 32]} />
          <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.6} />
        </mesh>
      )}
      {selectedTop === "spout-top" && (
        <group position={[0, 1.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
            <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.6} />
          </mesh>
        </group>
      )}
      {selectedTop === "flap-top" && (
        <mesh position={[0, 1.05, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.8, 0.05, 0.8]} />
          <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.6} />
        </mesh>
      )}
      {selectedTop === "duffle-top" && (
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.4, 0.76, 0.2, 32]} />
          <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.6} />
        </mesh>
      )}

      {/* Loop configuration */}
      {selectedLoop === "cross-corner" && (
        <>
          <mesh position={[0.8, 1.3, 0.8]}>
            <torusGeometry args={[0.15, 0.03, 16, 32]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[-0.8, 1.3, -0.8]}>
            <torusGeometry args={[0.15, 0.03, 16, 32]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </>
      )}
      {selectedLoop === "corner-seam" && (
        <>
          {[0.8, -0.8].map((x, i) =>
            [0.8, -0.8].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.3, z]}>
                <torusGeometry args={[0.12, 0.03, 16, 32]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            ))
          )}
        </>
      )}
      {selectedLoop === "stevedore" && (
        <group position={[0, 1.3, 0]}>
          <mesh position={[0.6, 0, 0]}>
            <boxGeometry args={[0.05, 0.4, 0.1]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[-0.6, 0, 0]}>
            <boxGeometry args={[0.05, 0.4, 0.1]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      )}
      {selectedLoop === "sleeve" && (
        <>
          {[0.6, -0.6].map((x, i) => (
            <mesh key={i} position={[x, 1.3, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
          ))}
        </>
      )}
      {selectedLoop === "single-point" && (
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      )}

      {/* Bottom configuration */}
      {selectedBottom === "plain" && (
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.6} />
        </mesh>
      )}
      {selectedBottom === "spout" && (
        <group position={[0, -1.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
            <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.6} />
          </mesh>
        </group>
      )}
      {selectedBottom === "open" && (
        <mesh position={[0, -1, 0]}>
          <ringGeometry args={[0.5, 0.76, 32]} />
          <meshStandardMaterial 
            color="#2563eb" 
            metalness={0.3} 
            roughness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default function BagPreview3D(props: BagPreview3DProps) {
  return (
    <Canvas
      camera={{ position: [3, 2, 3], fov: 50 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <Bag3DModel {...props} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
      />
    </Canvas>
  );
}
