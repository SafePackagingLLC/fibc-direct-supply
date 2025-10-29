import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import logo from "@/assets/safe-packaging-logo.png";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface BagPreview3DProps {
  selectedTop: string;
  selectedLoop: string;
  selectedBottom: string;
  selectedFabric: string;
}

function Bag3DModel({ selectedTop, selectedLoop, selectedBottom, selectedFabric }: BagPreview3DProps) {
  const bagRef = useRef<THREE.Group>(null);

  // Load logo texture
  const logoTexture = useLoader(THREE.TextureLoader, logo);

  // Enhanced fabric appearance with polypropylene texture simulation
  const getFabricMaterial = () => {
    const baseProps = {
      metalness: 0.08,
      roughness: 0.75,
      envMapIntensity: 0.5,
    };

    switch (selectedFabric) {
      case "coated":
        return { color: "#f8f8f8", ...baseProps, roughness: 0.6, metalness: 0.12, envMapIntensity: 0.6 };
      case "breathable":
        return { color: "#fafafa", ...baseProps, roughness: 0.85, metalness: 0.05 };
      case "food-grade":
        return { color: "#ffffff", ...baseProps, roughness: 0.68, metalness: 0.1, envMapIntensity: 0.65 };
      default:
        return { color: "#f5f5f5", ...baseProps };
    }
  };

  const fabricMaterial = getFabricMaterial();

  // Enhanced loop material with better definition
  const loopMaterial = {
    color: "#2563eb",
    metalness: 0.2,
    roughness: 0.65,
    envMapIntensity: 0.7,
  };

  return (
    <group ref={bagRef}>
      {/* Main bag body with subtle curves */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.78, 2, 32]} />
        <meshStandardMaterial {...fabricMaterial} />
      </mesh>

      {/* Logo on front face */}
      <mesh position={[0.79, 0.2, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.5, 0.25]} />
        <meshStandardMaterial 
          map={logoTexture} 
          transparent 
          opacity={0.85}
          roughness={0.6}
          metalness={0.08}
        />
      </mesh>

      {/* Top configuration */}
      {selectedTop === "open-top" && (
        <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.78, 0.78, 0.15, 32]} />
          <meshStandardMaterial 
            color="#e5e5e5"
            metalness={0.1} 
            roughness={0.75}
            envMapIntensity={0.5}
          />
        </mesh>
      )}
      {selectedTop === "spout-top" && (
        <group position={[0, 1.1, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.38, 20]} />
            <meshStandardMaterial 
              color="#d5d5d5"
              metalness={0.12} 
              roughness={0.68}
              envMapIntensity={0.55}
            />
          </mesh>
          <mesh position={[0, 0.27, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.13, 0.18, 16]} />
            <meshStandardMaterial 
              color="#bfbfbf"
              metalness={0.15} 
              roughness={0.6}
              envMapIntensity={0.6}
            />
          </mesh>
        </group>
      )}
      {selectedTop === "flap-top" && (
        <mesh position={[0, 1.08, 0]} rotation={[0.12, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.08, 1.2]} />
          <meshStandardMaterial 
            color="#dadada"
            metalness={0.08} 
            roughness={0.72}
            envMapIntensity={0.5}
          />
        </mesh>
      )}
      {selectedTop === "duffle-top" && (
        <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.78, 0.28, 32]} />
          <meshStandardMaterial 
            color="#dfdfdf"
            metalness={0.08} 
            roughness={0.78}
            envMapIntensity={0.5}
          />
        </mesh>
      )}

      {/* Loop configuration with enhanced definition */}
      {selectedLoop === "cross-corner" && (
        <>
          <mesh position={[0.58, 1.35, 0.58]} castShadow receiveShadow>
            <torusGeometry args={[0.16, 0.04, 20, 32]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
          <mesh position={[-0.58, 1.35, -0.58]} castShadow receiveShadow>
            <torusGeometry args={[0.16, 0.04, 20, 32]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
        </>
      )}
      {selectedLoop === "corner-seam" && (
        <>
          {[0.58, -0.58].map((x, i) =>
            [0.58, -0.58].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.35, z]} castShadow receiveShadow>
                <torusGeometry args={[0.14, 0.04, 20, 32]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            ))
          )}
        </>
      )}
      {selectedLoop === "stevedore" && (
        <group position={[0, 1.35, 0]}>
          <mesh position={[0.55, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.5, 0.14]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
          <mesh position={[-0.55, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.5, 0.14]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
        </group>
      )}
      {selectedLoop === "sleeve" && (
        <>
          {[0.55, -0.55].map((x, i) => (
            <mesh key={i} position={[x, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.4, 20]} />
              <meshStandardMaterial {...loopMaterial} />
            </mesh>
          ))}
        </>
      )}
      {selectedLoop === "single-point" && (
        <>
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial {...loopMaterial} />
          </mesh>
          {[0.4, -0.4].map((x, i) =>
            [0.4, -0.4].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.45, z]} rotation={[0, 0, Math.atan2(z, x)]} castShadow receiveShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
                <meshStandardMaterial {...loopMaterial} />
              </mesh>
            ))
          )}
        </>
      )}

      {/* Bottom configuration */}
      {selectedBottom === "plain" && (
        <mesh position={[0, -1.025, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.78, 0.78, 0.1, 32]} />
          <meshStandardMaterial 
            color="#dddddd"
            metalness={0.1} 
            roughness={0.75}
            envMapIntensity={0.5}
          />
        </mesh>
      )}
      {selectedBottom === "spout" && (
        <group position={[0, -1.15, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.38, 20]} />
            <meshStandardMaterial 
              color="#cecece"
              metalness={0.12} 
              roughness={0.68}
              envMapIntensity={0.55}
            />
          </mesh>
          <mesh position={[0, -0.27, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.13, 0.18, 16]} />
            <meshStandardMaterial 
              color="#b8b8b8"
              metalness={0.15} 
              roughness={0.6}
              envMapIntensity={0.6}
            />
          </mesh>
        </group>
      )}
      {selectedBottom === "open" && (
        <mesh position={[0, -1.025, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <ringGeometry args={[0.45, 0.78, 32]} />
          <meshStandardMaterial 
            color="#d5d5d5"
            metalness={0.1} 
            roughness={0.72}
            envMapIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default function BagPreview3D(props: BagPreview3DProps) {
  const controlsRef = useRef<any>(null);
  
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg">
      <Canvas
        camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Studio-style lighting setup */}
        <ambientLight intensity={0.4} />
        
        {/* Key light - main illumination from top-right */}
        <directionalLight 
          position={[8, 12, 6]} 
          intensity={1.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />
        
        {/* Fill light - soft illumination from left */}
        <directionalLight 
          position={[-6, 8, -4]} 
          intensity={0.5}
        />
        
        {/* Rim light - subtle highlight from behind */}
        <directionalLight 
          position={[-3, 3, -8]} 
          intensity={0.3}
        />
        
        {/* Soft ambient fill */}
        <hemisphereLight 
          args={["#ffffff", "#8b9bb5", 0.4]} 
        />
        
        {/* Environment for subtle reflections */}
        <Environment preset="studio" environmentIntensity={0.3} />
        
        <Bag3DModel {...props} />
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.9}
          minPolarAngle={Math.PI / 6}
          minAzimuthAngle={-Math.PI}
          maxAzimuthAngle={Math.PI}
        />
      </Canvas>
      
      {/* Reset view button */}
      <Button
        onClick={resetView}
        size="sm"
        variant="secondary"
        className="absolute bottom-4 right-4 shadow-lg hover:scale-105 transition-transform"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset View
      </Button>
    </div>
  );
}
