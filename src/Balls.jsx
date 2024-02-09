import { useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef } from "react";
import { Text } from "@react-three/drei";

export const Balls = () => {
    const light = useRef();
    useFrame((state) => {
        light.current.position.z = state.camera.position.z + 1 - 4;
        light.current.target.position.z = state.camera.position.z - 4;
        light.current.target.updateMatrixWorld();
    });
    return (
        <>
            <Physics gravity={[0, 2, 0]} iterations={10}>
                <Ball />
                <Pointer />
            </Physics>
            <EffectComposer disableNormalPass multisampling={0}>
                <N8AO
                    halfRes
                    color="black"
                    aoRadius={2}
                    intensity={1}
                    aoSamples={6}
                    denoiseSamples={4}
                />
                <SMAA />
            </EffectComposer>
            <Text color={"black"}>Hello</Text>
            <directionalLight
                ref={light}
                castShadow
                position={[4, 4, 1]}
                intensity={4.5}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={10}
                shadow-camera-right={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
            />
            <ambientLight intensity={2} />
        </>
    );
};

function Ball({
    mat = new THREE.Matrix4(),
    vec = new THREE.Vector3(),
    ...props
}) {
    const rfs = THREE.MathUtils.randFloatSpread;
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: "#fd5a1e",
        roughness: 0,
        envMapIntensity: 1,
    });
    const [ref, api] = useSphere(() => ({
        args: [1],
        mass: 1,
        angularDamping: 0.1,
        linearDamping: 0.65,
        position: [rfs(20), rfs(20), rfs(20)],
    }));
    useFrame((state) => {
        for (let i = 0; i < 40; i++) {
            ref.current.getMatrixAt(i, mat);
            api.at(i).applyForce(
                vec
                    .setFromMatrixPosition(mat)
                    .normalize()
                    .multiplyScalar(-40)
                    .toArray(),
                [0, 0, 0]
            );
        }
    });

    return (
        <instancedMesh
            ref={ref}
            castShadow
            receiveShadow
            args={[sphereGeometry, sphereMaterial, 40]}
            // onClick={() => sphereMaterial.color.set("hotpink")}
        />
    );
}

function Pointer() {
    const viewport = useThree((state) => state.viewport);
    const [, api] = useSphere(() => ({
        type: "Kinematic",
        args: [3],
        position: [0, 0, 0],
    }));
    return useFrame((state) =>
        api.position.set(
            (state.mouse.x * viewport.width) / 2,
            (state.mouse.y * viewport.height) / 2,
            0
        )
    );
}
