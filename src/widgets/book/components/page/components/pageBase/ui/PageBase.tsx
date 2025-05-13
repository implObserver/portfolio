import * as THREE from 'three';
import { animated, SpringValue } from '@react-spring/three';
import { Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';

export interface PageBaseProps {
    position: [number, number, SpringValue<number>];
    rotationY: SpringValue<number>;
    texture: THREE.Texture;
    children: React.ReactNode;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
    pageNumbers?: { max: number; min: number };
    flipped?: boolean;
}

export const PageBase = ({
    position,
    rotationY,
    texture,
    children,
    onClick,
    pageNumbers,
    flipped,
}: PageBaseProps) => {
    return (
        <animated.group
            rotation-y={rotationY}
            position={position}
            onClick={onClick}
        >
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[3.9, 5.9]} />
                <meshStandardMaterial
                    side={THREE.DoubleSide}
                    map={texture}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {children}

            {pageNumbers && (
                <>
                    <Text
                        position={[0, -2.6, 0.01]}
                        rotation-y={flipped ? 0 : Math.PI}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {pageNumbers.max}
                    </Text>
                    <Text
                        position={[0, -2.6, -0.02]}
                        rotation-y={Math.PI}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {pageNumbers.min}
                    </Text>
                </>
            )}
        </animated.group>
    );
};