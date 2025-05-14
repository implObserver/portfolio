import { useEffect, useRef } from 'react';
import { animated, useSpring } from '@react-spring/three';
import { useLoader, type ThreeEvent } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { bookActions, selectBook } from '@/services/slices/book';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import * as THREE from 'three';

export const FrontCover3D = ({ positionZ }: { positionZ: number }) => {
    const book = useSelector(selectBook);
    const dispatch = useAppDispatch();
    const textureRef = useRef<THREE.MeshStandardMaterial>(null!);
    const texture = useLoader(THREE.TextureLoader, "back.png");
    texture.flipY = false; // важно, иначе будет вверх ногами
    texture.wrapS = THREE.RepeatWrapping;
    // Загрузка текстуры
    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
            'front2.png', // Путь к вашему PNG-файлу
            (texture) => {
                if (textureRef.current) {
                    textureRef.current.map = texture;
                    textureRef.current.needsUpdate = true;
                }
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
            }
        );
    }, []);

    const { rotationY, z } = useSpring({
        rotationY: book.isOpen ? -0.2 : !book.isOpen && book.isFinished ? 0 : Math.PI,
        z: positionZ,
        config: { mass: 1, tension: 120, friction: 30 },
        onStart: () => dispatch(bookActions.startAnimation()),
        onRest: () => dispatch(bookActions.endAnimation()),
    });

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (book.currentPage > 1) return;
        dispatch(book.isOpen ? bookActions.closeBook(false) : bookActions.openBook());
    };

    return (
        <animated.group
            rotation-y={rotationY}
            position-x={-2}
            position-y={0}
            position-z={z}

            onClick={handleClick}
        >
            <mesh position={[-2, 0, 0]}>
                <boxGeometry args={[4, 6, 0.1]} />

                {/* Массив материалов: [right, left, top, bottom, front, back] */}
                {/** Только передняя сторона (index 4) будет с текстурой */}
                <meshStandardMaterial attach="material-3" color="#888" />
                <meshStandardMaterial attach="material-0" color="#888" />
                <meshStandardMaterial attach="material-1" color="#888" />
                <meshStandardMaterial attach="material-2" color="#888" />
                <meshStandardMaterial
                    attach="material-5"
                    ref={textureRef}
                    color="#ffffff"
                    side={THREE.FrontSide}
                    roughness={0.5}
                    metalness={0.1}
                />
                <meshStandardMaterial map={texture} attach="material-4" color="#888" />
            </mesh>
        </animated.group>
    );
};