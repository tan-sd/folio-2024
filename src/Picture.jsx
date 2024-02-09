import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";

// Vertex Shader
const vertexShader = `
uniform float uTime;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uWaveSpeed;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Simple wave effect
  pos.z += sin(pos.x * uWaveFrequency + uTime * uWaveSpeed) * uWaveAmplitude;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

// Fragment Shader
const fragmentShader = `
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(uTexture, vUv);
}`;

// ShaderMaterial Setup
const WaveShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uTexture: { value: new THREE.Texture() },
        uWaveAmplitude: { value: 0.1 },
        uWaveFrequency: { value: 10.0 },
        uWaveSpeed: { value: 1.0 },
    },
    vertexShader,
    fragmentShader,
};

const WaveImage = ({ imageUrl }) => {
    const meshRef = useRef();
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    const shaderMaterial = useMemo(
        () => new THREE.ShaderMaterial(WaveShaderMaterial),
        []
    );

    useFrame(({ clock }) => {
        meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    });

    useEffect(() => {
        shaderMaterial.uniforms.uTexture.value = texture;
    }, [texture, shaderMaterial.uniforms.uTexture]);

    return (
        <mesh ref={meshRef}>
            <planeGeometry attach="geometry" args={[0.4, 0.6, 16, 16]} />
            <shaderMaterial attach="material" args={[shaderMaterial]} />
        </mesh>
    );
};

export const Picture = () => {
    return (
        <Canvas camera={{fov:10}}>
            <WaveImage imageUrl="/image/profile/shengda.jpg" />
        </Canvas>
    );
};
