import React, { useState, useRef, useEffect } from 'react';
import { type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface HoldableLinkProps {
    url: string;
    children: React.ReactNode;
    position: [number, number, number];
    rotationY?: number;
}

export const HoldableLink = ({ url, children, position, rotationY = 0 }: HoldableLinkProps) => {
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    const holdStart = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const animationFrameId = useRef<number | null>(null);

    // Анимация прогресса (равномерное заполнение за 1 секунду)
    const animateProgress = (timestamp: number) => {
        if (!holdStart.current) return;

        const elapsed = timestamp - holdStart.current;
        const duration = 1000; // 1 секунда
        const percent = Math.min(elapsed / duration, 1);

        setProgress(percent * 100);

        if (percent < 1) {
            animationFrameId.current = requestAnimationFrame(animateProgress);
        } else {
            window.open(url, '_blank');
        }
    };

    // Начать удержание
    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        holdStart.current = performance.now();

        // НЕ показываем прогресс сразу
        setShowProgress(false);

        timeoutRef.current = window.setTimeout(() => {
            setShowProgress(true); // Показываем прогресс ТОЛЬКО если удерживаем
            animationFrameId.current = requestAnimationFrame(animateProgress);
        }, 150);
    };

    // Остановить удержание
    const handlePointerUpOrLeave = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        holdStart.current = null;
        setShowProgress(false);
        setProgress(0);
    };

    // Клик — открываем сразу, если не начали прогресс


    // Очистка на случай размонтирования
    useEffect(() => {
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <group
            position={position}
            rotation-y={rotationY}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUpOrLeave}
            onPointerLeave={handlePointerUpOrLeave}

        >
            {children}

            {/* Прогресс-бар через Html */}
            {showProgress && (
                <Html distanceFactor={10}>
                    <div className='text-red-100'> Открытие ссылки {Math.round(progress)} %</div>
                    <div style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        width: '100px',
                        height: '4px',
                        backgroundColor: '#ccc',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: '#0070f3',
                            transition: 'width 0.05s linear'
                        }} />
                    </div>
                </Html>
            )}
        </group>
    );
};