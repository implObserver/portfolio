import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import { Text, useTexture } from '@react-three/drei';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { bookActions, selectBook } from '@/services/slices/book';
import { useSelector } from 'react-redux';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

interface ContentsPage3DProps {
    positionZ: number;
    index: number;
    contents: { title: string; pageNumber: number; icon: string }[];
}

export const ContentsPage3D = ({ positionZ, index, contents }: ContentsPage3DProps) => {
    const book = useSelector(selectBook);
    const dispatch = useAppDispatch();
    const [flipped, setFlipped] = useState(false);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    const { currentPage, currentLeave, isBookmark, isOpen, isFinished } = book;

    const different = book.total_leave - index;
    const koef = different * book.baze_z + book.baze_z * (book.total_leave + 3);
    const maxPage = different * 2;
    const minPage = maxPage - 1;

    const [flippedTexture, nonFlippedTexture] = useTexture([
        'flipped.png',    // Текстура для перевернутой страницы
        'noFlipped.png'  // Текстура для обычной страницы
    ]);

    // Обновление текстуры при изменении состояния flipped
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.map = flipped ? flippedTexture : nonFlippedTexture;
            materialRef.current.needsUpdate = true;
        }
    }, [flipped, flippedTexture, nonFlippedTexture]);

    useEffect(() => {
        if (!isOpen) setFlipped(false);
        if (index === currentLeave && !isBookmark) {
            dispatch(bookActions.setBookmark(true));
            if (currentPage === maxPage) setFlipped(true);
        } else if (index > currentLeave && !isBookmark) {
            setFlipped(true);
        }
    }, [isBookmark, currentLeave, currentPage, dispatch, index, maxPage]);

    const { rotationY, z } = useSpring({
        z: flipped ? koef : positionZ,
        rotationY: !isOpen && isFinished ? 0 : flipped ? -0.2 : Math.PI,
        config: { mass: 0.05, tension: 120, friction: 30 },
        onStart: () => dispatch(bookActions.startAnimation()),
        onRest: () => dispatch(bookActions.endAnimation()),
    });

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!isOpen || Math.abs(currentLeave - index) > 1) return;
        setFlipped(prev => !prev);
        dispatch(bookActions.setCurrentLeave(index));
        dispatch(bookActions.setCurrentPage(flipped ? minPage : maxPage));
    };

    const navigateToPage = (e: ThreeEvent<MouseEvent>, pageNumber: number) => {
        e.stopPropagation();
        dispatch(bookActions.setCurrentPage(pageNumber));
        dispatch(bookActions.setCurrentLeave(Math.floor((book.total_leave * 2 - pageNumber) / 2)));
    };

    const renderContentsSide = (backSide = false) => {
        const zOffset = backSide ? -0.03 : 0.03;
        const rotY = backSide ? Math.PI : 0;

        return (
            <>
                <Text
                    position={[-2, 2.5, zOffset]}
                    rotation-y={rotY}
                    fontSize={0.25}
                    color="#333"
                    anchorX="center"

                >
                    ОГЛАВЛЕНИЕ
                </Text>

                {contents.map((item, i) => {
                    const dots = '.';
                    return (
                        <group key={i} position={[-2, 1.8 - i * 0.5, zOffset]} rotation-y={rotY}>
                            <Text
                                position={[-1.8, 0, 0]}
                                fontSize={0.15}
                                color="#333"
                                anchorX="left"
                                onClick={(e) => navigateToPage(e, item.pageNumber)}

                            >
                                {item.icon} {item.title}
                            </Text>
                            <Text
                                position={[1.8, 0, 0]}
                                fontSize={0.15}
                                color="#666"
                                anchorX="right"

                            >
                                {dots} {item.pageNumber}
                            </Text>
                        </group>
                    );
                })}
            </>
        );
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
                <planeGeometry args={[3.9, 5.9]} />
                <meshStandardMaterial
                    color="#f9f5e8"
                    side={THREE.DoubleSide}
                    map={flipped ? flippedTexture : nonFlippedTexture}
                />
            </mesh>

            {/* Лицевая сторона */}
            <group position={[0, 0, 0.01]}>
                {renderContentsSide(false)}
            </group>

            {/* Обратная сторона */}
            <group position={[0, 0, -0.01]}>
                {renderContentsSide(true)}
            </group>

            {/* Номера страниц */}
            <Text
                position={[-3.5, -2.8, 0.02]}
                rotation-y={flipped ? 0 : Math.PI}
                fontSize={0.18}
                color="#666"
                anchorX="left"

            >
                {maxPage}
            </Text>
            <Text
                position={[-3.5, -2.8, -0.02]}
                rotation-y={Math.PI}
                fontSize={0.18}
                color="#666"
                anchorX="left"

            >
                {minPage}
            </Text>
        </animated.group>
    );
};