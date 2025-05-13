import { useLoader } from '@react-three/fiber';
import { TextureLoader, MeshPhysicalMaterial } from 'three';
import { useMemo } from 'react';

interface LitImageProps {
    url: string;
    position: [number, number, number];
    rotationY?: number;
    scale?: [number, number, number];
    onClick?: () => void;
}

export const LitImage = ({
    url,
    position,
    rotationY = 0,
    scale = [1, 1, 1],
    onClick,
}: LitImageProps) => {
    const texture = useLoader(TextureLoader, url);

    const material = useMemo(() => {
        const mat = new MeshPhysicalMaterial({
            map: texture,
            roughness: 0.1,         // более гладкая поверхность
            metalness: 0.0,         // не металлическая
            reflectivity: 1,      // отражения света
            clearcoat: 1.0,         // ламинация (глянец сверху)
            clearcoatRoughness: 0,
        });
        return mat;
    }, [texture]);

    return (
        <mesh
            position={position}
            rotation={[0, rotationY, 0]}
            scale={scale}
            onClick={onClick}
        >
            <planeGeometry args={[1, 1]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
};