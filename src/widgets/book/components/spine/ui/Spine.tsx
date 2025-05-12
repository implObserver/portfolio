import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { selectBook } from "@/services/slices/book";
import { useSelector } from "react-redux";
import { animated, useSpring } from '@react-spring/three';

export const Spine3D = () => {
    const book = useSelector(selectBook);
    const textureRef = useRef<THREE.MeshStandardMaterial>(null);
    const size = (book.total_leave + 4) * book.baze_z;
    const diff = (book.total_leave) * book.baze_z * 0.5;

    const { z } = useSpring({
        z: !book.isOpen && book.isFinished ? book.total_leave * book.baze_z : 0,
        config: { mass: 1, tension: 120, friction: 30 },
    });

    // Загрузка текстуры
    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
            'profilePine.png', // Путь к текстуре корешка
            (texture) => {
                if (textureRef.current) {
                    // Настройки текстуры для лучшего отображения
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(1, 1);
                    texture.anisotropy = 16;

                    textureRef.current.map = texture;
                    textureRef.current.needsUpdate = true;
                }
            },
            undefined,
            (error) => {
                console.error('Error loading spine texture:', error);
            }
        );

        return () => {
            if (textureRef.current?.map) {
                textureRef.current.map.dispose();
            }
        };
    }, []);

    return (
        <animated.group
            position-z={z}
        >
            <mesh position={[-2, 0, diff]}>
                <boxGeometry args={[0.1, 6, size]} />
                <meshStandardMaterial
                    ref={textureRef}
                    color="#eb9c09" // Цвет будет использоваться если текстура не загрузится
                    roughness={0.7}
                    metalness={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </animated.group>
    );
};