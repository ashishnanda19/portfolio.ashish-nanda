import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    // Load high-res textures from public three.js repository (reliable for examples)
    const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
    ]);

    useFrame((_state, delta) => {
        if (earthRef.current) {
            // Earth's axial rotation
            earthRef.current.rotation.y += delta * 0.05;
        }
        if (cloudsRef.current) {
            // Clouds rotate slightly faster than the earth itself to simulate weather currents
            cloudsRef.current.rotation.y += delta * 0.07;
        }
    });

    return (
        <group>
            {/* The Earth Base Sphere */}
            <mesh ref={earthRef} castShadow receiveShadow rotation={[0, 0, Math.PI * 0.1]}>
                {/* 64 segments for incredibly smooth geometry */}
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    normalScale={new THREE.Vector2(0.8, 0.8)}
                    specularMap={specularMap}
                    specular={new THREE.Color('grey')}
                    shininess={35} // High shininess combined with specular map makes only oceans reflect light
                />
            </mesh>

            {/* The Atmospheric Cloud Layer */}
            <mesh ref={cloudsRef} castShadow receiveShadow rotation={[0, 0, Math.PI * 0.1]}>
                {/* Slightly larger than base earth */}
                <sphereGeometry args={[2.52, 64, 64]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Subtle blue atmospheric glow (faked fresnel) */}
            <mesh>
                <sphereGeometry args={[2.7, 64, 64]} />
                <meshBasicMaterial
                    color="#4b8df8"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
};

const LoadingFallback = () => (
    <Html center>
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-blue-400 font-mono text-xs tracking-widest uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
                INITIALIZING SATELLITE...
            </span>
        </div>
    </Html>
);

const Hero3D = () => {
    return (
        <div className="w-full h-full min-h-[400px] relative flex justify-center items-center cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 2]}>
                {/* Realistic Lighting for Earth */}
                <ambientLight intensity={0.05} />
                {/* Main "Sun" directional light casting stark shadows */}
                <directionalLight position={[10, 5, 5]} intensity={2.5} color="#ffffff" castShadow />
                {/* Slight backfill light simulating starlight/nebula glow */}
                <directionalLight position={[-10, -5, -5]} intensity={0.2} color="#8b5cf6" />

                <Suspense fallback={<LoadingFallback />}>
                    <Earth />
                </Suspense>

                {/* Deep field stars */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <OrbitControls
                    enableZoom={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    // Prevent looking from directly straight down or straight up to maintain realism
                    maxPolarAngle={Math.PI - Math.PI / 4}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>
        </div>
    );
};

export default Hero3D;
