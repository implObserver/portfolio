import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { FoggyScene } from '@/shared/ui/scene3D';

const AnimatedBox = () => {
    const boxRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (boxRef.current) {
            boxRef.current.rotation.x += 0.005;
            boxRef.current.rotation.y += 0.005;
            boxRef.current.rotation.z += 0.005;
        }
    })

    return (
        <mesh ref={boxRef}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={'red'} />
        </mesh>
    )
}

export const PathWithProjects = () => {
    return (
        <FoggyScene>
            <AnimatedBox />
        </FoggyScene>
    );
};