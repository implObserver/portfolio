import { useEffect, useRef, useState, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { useThree, type ThreeEvent } from '@react-three/fiber';
import { useSelector } from 'react-redux';

import { Spine3D } from '../components/spine';
import { FrontCover3D } from '../components/frontCover';
import { BackCover3D } from '../components/backCover';
import { Page3D } from '../components/page';

import { bookActions, selectBook } from '@/services/slices/book';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { projects } from '../lib/const/projects';

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

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        setZoom(prev => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)));
    }, []);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    // === Pointer Rotation Handlers ===
    const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setIsDragging(true);
        lastPosition.current.x = e.clientX;
    };

    const handlePointerMove = (e: ThreeEvent<MouseEvent>) => {
        if (!isDragging) return;
        e.stopPropagation();
        const deltaX = e.clientX - lastPosition.current.x;
        setRotationY(prev => prev + deltaX * 0.01);
        lastPosition.current.x = e.clientX;
    };

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
        <group
            ref={groupRef}
            position={[0, 0, 0]}
            rotation={[0, rotationY, 0]}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            <animated.group position-x={positionX}>
                <Spine3D />
                <BackCover3D positionZ={-book.baze_z} />

                {Array.from({ length: book.total_leave }).map((_, i) => (
                    <Page3D
                        key={i}
                        index={i}
                        positionZ={book.baze_z * (i + 1)}
                        project={projects[i]}
                    />
                ))}

                <FrontCover3D positionZ={book.baze_z * (book.total_leave + 1)} />
            </animated.group>
        </group>
    );
};
