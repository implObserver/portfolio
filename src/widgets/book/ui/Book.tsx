import { useEffect, useRef, useState, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { Spine3D } from '../components/spine';
import { FrontCover3D } from '../components/frontCover';
import { BackCover3D } from '../components/backCover';
import { Page3D } from '../components/page';
import { bookActions, selectBook } from '@/services/slices/book';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { projects, type Project } from '../lib/const/projects';
import { ContentsPage3D } from '../components/contentsPage';
import { contents } from '../lib/const/pages';
import { ResponsiveSpotLight } from '@/shared/ui/responsiveLight';

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 1.3;
const BASE_CAMERA_Z = 10;

export const Book3D = () => {
    const groupRef = useRef<THREE.Group>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const { camera } = useThree();
    const book = useSelector(selectBook);
    const dispatch = useAppDispatch();
    const [zoom, setZoom] = useState(1);
    const [rotationY, setRotationY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [scale, setScale] = useState(1);

    // Анимация появления книги (издалека)
    const { positionZ } = useSpring({
        from: { positionZ: -20 }, // Начальное положение (далеко от камеры)
        to: { positionZ: 0 },     // Конечное положение (нормальная позиция)
        config: { tension: 120, friction: 20 } // Настройки анимации
    });

    const { positionX } = useSpring({
        positionX: book.isOpen
            ? 2
            : !book.isOpen && book.isFinished
                ? 4
                : 0,
    });

    // === Camera Zoom Effect ===
    useEffect(() => {
        camera.position.z = BASE_CAMERA_Z / zoom;
        camera.updateProjectionMatrix();
    }, [zoom, camera]);

    // === Book scaling based on window size ===
    useEffect(() => {
        const handleResize = () => {
            const newScale = Math.min(window.innerWidth / 1100, 1);
            setScale(newScale);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        setZoom(prev => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)));
    }, []);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            const deltaX = e.clientX - lastPosition.current.x;
            setRotationY(prev => prev + deltaX * 0.01);
            lastPosition.current.x = e.clientX;
        };

        const handlePointerUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging]);

    // === Book animation initialization ===
    useEffect(() => {
        dispatch(bookActions.setBookmark(false));
        dispatch(bookActions.endAnimation());
    }, [dispatch]);

    return (
        <animated.group
            ref={groupRef}
            position={positionZ.to(z => [0, 0, z])} // Анимируем позицию по Z
            rotation={[0, rotationY, 0]}
            scale={scale}
        >
            {book.isOpen && (
                <ResponsiveSpotLight />
            )}
            <animated.group position-x={positionX}>
                <Spine3D />
                <BackCover3D positionZ={-book.baze_z} />

                <ContentsPage3D
                    index={-1}
                    contents={contents}
                    positionZ={-book.baze_z * 0.5}
                />
                {Array.from({ length: book.total_leave }).map((_, i) => {
                    const firstIndex = i * 2;
                    const pair: Project[] = [
                        projects[firstIndex - 1],
                        projects[firstIndex],
                    ];
                    console.log(`${firstIndex} ${firstIndex + 1}`)
                    return (
                        <mesh key={i}>
                            <Page3D
                                index={i}
                                positionZ={book.baze_z * (i + 1)}
                                projects={pair}
                            />
                        </mesh>
                    );
                })}

                <ContentsPage3D
                    index={book.total_leave}
                    contents={contents}
                    positionZ={book.baze_z * (book.total_leave + 1)}
                />

                <FrontCover3D positionZ={book.baze_z * (book.total_leave + 1)} />
            </animated.group>
        </animated.group>
    );
};