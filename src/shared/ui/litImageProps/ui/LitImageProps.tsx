import { useLoader, type ThreeEvent } from '@react-three/fiber';
import { TextureLoader, MeshPhysicalMaterial, DoubleSide } from 'three';
import { useMemo } from 'react';

interface LitImageProps {
    url: string;
    position: [number, number, number];
    rotationY?: number;
    scale?: [number, number, number];
    onClick?: () => void;
    onPointerDown?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerUp?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerLeave?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
}

export const LitImage = ({
    url,
    position,
    rotationY = 0,
    scale = [1, 1, 1],
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerMove,
}: LitImageProps) => {
    const texture = useLoader(TextureLoader, url);

    const material = useMemo(() => {
        return new MeshPhysicalMaterial({
            map: texture,
            roughness: 0.05,           // ещё более гладкая поверхность
            metalness: 0,              // не металлическая
            reflectivity: 1,
            clearcoat: 1.0,
            clearcoatRoughness: 0,
            side: DoubleSide,
            toneMapped: false,         // отключаем автоматическое тонирование — чтобы свет не "сжирал" контраст
        });
    }, [texture]);

    // ✅ если это обратная сторона, отзеркали масштаб по X
    const defaultScale: [number, number, number] = [0, 0, 0];
    const safeScale = (scale.length === 3 ? scale : defaultScale) as [number, number, number];
    const actualScale: [number, number, number] =
        rotationY === Math.PI
            ? [-safeScale[0], safeScale[1], safeScale[2]]
            : safeScale;

    return (
        <mesh
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'default')}
            position={position}
            rotation={[0, rotationY, 0]}
            scale={actualScale}
            onClick={onClick}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
        >
            <planeGeometry args={[1, 1]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
};