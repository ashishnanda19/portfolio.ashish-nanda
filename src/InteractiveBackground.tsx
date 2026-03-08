import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterHotspot {
  id: number;
  label: string;
  quote: string;
  normPosition: [number, number, number]; // Normalized coordinates (-0.5 to 0.5)
  tooltipOffset: [number, number, number]; // Offset for the tooltip
}

const characters: CharacterHotspot[] = [
  {
    id: 1,
    label: "DRIVE & DISCIPLINE",
    quote: "Relentless pursuit of excellence. Every line of code must be in perfect harmony.",
    normPosition: [-0.38, 0.15, 0.5], // Top Left (Ferrari jacket)
    tooltipOffset: [0, -2.5, 0] // Show below
  },
  {
    id: 2,
    label: "PROFOUND VISION",
    quote: "Seeing the architecture before it's built. Clarity in complexity.",
    normPosition: [0.02, 0.25, 0.8], // Top Center (Portrait)
    tooltipOffset: [0, -2.5, 0] // Show below
  },
  {
    id: 3,
    label: "GROWTH",
    quote: "Continuous learning. Finding the shortest path in a graph and in life.",
    normPosition: [-0.22, -0.25, 0.6], // Bottom Left (Looking down)
    tooltipOffset: [0, 2.5, 0] // Show above
  },
  {
    id: 4,
    label: "TIMELESS ELEGANCE",
    quote: "Building systems that scale beautifully and stand the test of time.",
    normPosition: [0.15, -0.35, 0.4], // Bottom Center/Right (Walking away)
    tooltipOffset: [0, 2.5, 0] // Show above
  },
  {
    id: 5,
    label: "QUIET CONFIDENCE",
    quote: "Letting the work speak for itself. Flow state achieved.",
    normPosition: [0.4, 0.05, 0.7], // Right (Sitting in swing)
    tooltipOffset: [0, 2.5, 0] // Show above
  }
];

function InteractiveCollage({ isDark }: { isDark: boolean }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const { viewport } = useThree();
  const planeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    // Assuming the user saves their image as collage.png in the public folder
    loader.load('/collage.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    }, undefined, () => {
      console.warn("Please save the uploaded image as public/collage.png to see the background!");
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth Parallax effect based on mouse movement - increased multiplier for deeper feel
    const targetX = (state.pointer.x * viewport.width) / 15;
    const targetY = (state.pointer.y * viewport.height) / 15;

    // Add a natural floating breathing effect
    const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatY, 0.05);

    // Enhanced rotation tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.15, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.15, 0.05);
  });

  // Calculate scaling so the image fits nicely without excessive overflow
  // We want to fit the image inside the viewport while maintaining its aspect ratio
  const imageAspect = 16 / 9; // Assuming the collage is roughly 16:9
  const viewportAspect = viewport.width / viewport.height;

  let scaleWidth, scaleHeight;

  // To "contain" like background-size: contain so the WHOLE image is visible
  if (viewportAspect > imageAspect) {
    // Viewport is wider than image. Constrain by height to fit entirely.
    scaleHeight = viewport.height * 0.95; // Slight padding for parallax
    scaleWidth = scaleHeight * imageAspect;
  } else {
    // Viewport is taller than image. Constrain by width.
    scaleWidth = viewport.width * 0.95;
    scaleHeight = scaleWidth / imageAspect;
  }

  return (
    <group ref={groupRef}>
      {/* Dynamic Backing Shadow/Glow behind the image */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[scaleWidth * 2, scaleHeight * 2]} />
        <meshBasicMaterial color="#0A0A0A" />
      </mesh>

      {texture ? (
        <mesh ref={planeRef} position={[0, 0, 0]}>
          <planeGeometry args={[scaleWidth, scaleHeight, 32, 32]} />
          {/* We use MeshStandardMaterial to let ambient light affect it, but emissive makes it visible */}
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={0.8}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      ) : (
        <Html center>
          <div className={`${isDark ? 'text-white/50' : 'text-black/50'} font-mono text-sm tracking-widest select-none pointer-events-none border ${isDark ? 'border-white/10' : 'border-black/10'} p-4 rounded-xl ${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-md`}>
            Waiting for public/collage.png...
          </div>
        </Html>
      )}

      {/* Interactive Hotspots over the character coordinates */}
      {texture && characters.map((char) => (
        <mesh
          key={char.id}
          position={[char.normPosition[0] * scaleWidth, char.normPosition[1] * scaleHeight, char.normPosition[2]]}
          onPointerOver={() => setHoveredId(char.id)}
          onPointerOut={() => setHoveredId(null)}
        >
          {/* Invisible hit box for raycasting */}
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial visible={false} />

          {/* Aesthetic Scanner/Ring indicator */}
          <Html center zIndexRange={[100, 0]}>
            <div className={`w-10 h-10 rounded-full border ${isDark ? 'border-white/20' : 'border-black/20'} cursor-pointer transition-all duration-700 ease-out flex items-center justify-center ${hoveredId === char.id ? `scale-150 ${isDark ? 'border-white/60 bg-white/5' : 'border-black/60 bg-black/5'} backdrop-blur-md` : ''}`}>
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${hoveredId === char.id ? (isDark ? 'bg-white shadow-[0_0_10px_white]' : 'bg-black shadow-[0_0_10px_black]') : `animate-ping ${isDark ? 'bg-white/40' : 'bg-black/40'}`}`} />
            </div>
          </Html>

          {/* Holographic Label Tooltip */}
          {hoveredId === char.id && (
            <Html position={char.tooltipOffset} center zIndexRange={[100, 0]}>
              <div
                className={`relative ${isDark ? 'bg-black/70 border-white/10' : 'bg-white/70 border-black/10'} backdrop-blur-2xl rounded-2xl p-6 border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300 pointer-events-none`}
                style={{ width: '320px' }}
              >
                <div className={`absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-br ${isDark ? 'from-white/5' : 'from-black/5'} to-transparent pointer-events-none`} />
                <h3 className={`${isDark ? 'text-white' : 'text-black'} text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-3`}>
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-white/80' : 'bg-black/80'} animate-pulse`} />
                  {char.label}
                </h3>
                <p className={`${isDark ? 'text-white/60' : 'text-black/60'} text-sm leading-relaxed font-medium relative z-10`}>
                  {char.quote}
                </p>
                {/* Cybernetic connector line extending towards the dot */}
                {char.tooltipOffset[1] > 0 ? (
                  <div className={`absolute -bottom-10 left-1/2 w-[1px] h-10 bg-gradient-to-t from-transparent ${isDark ? 'to-white/30' : 'to-black/30'} transform -translate-x-1/2`} />
                ) : (
                  <div className={`absolute -top-10 left-1/2 w-[1px] h-10 bg-gradient-to-b from-transparent ${isDark ? 'to-white/30' : 'to-black/30'} transform -translate-x-1/2`} />
                )}
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </group>
  );
}

const InteractiveBackground: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#f1f5f9]'}`}>
      {/* Clean elegant vignette gradient */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] pointer-events-none z-10 transition-colors duration-500 ${isDark ? 'from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]' : 'from-transparent via-[#f1f5f9]/40 to-[#f1f5f9]'}`} />

      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        {/* Subtle directed light to interact with StandardMaterial roughness */}
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#ffffff" />
        <InteractiveCollage isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default InteractiveBackground;
