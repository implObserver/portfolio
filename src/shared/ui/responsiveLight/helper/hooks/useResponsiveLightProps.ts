import { useState, useEffect } from 'react';

export const useResponsiveLightProps = () => {
    const [lightProps, setLightProps] = useState({
        position: [0, 25, 5] as [number, number, number],
        angle: 3,
        intensity: 20,
        distance: 20,
    });

    useEffect(() => {
        const updateLightProps = () => {
            if (window.innerWidth < 468) {
                // Мобильные устройства
                setLightProps({
                    position: [0, 14, 3], // Ближе к центру, меньше высота и глубина
                    angle: 1,         // Уменьшаем угол, чтобы не освещало слишком много
                    intensity: 50,      // Снижаем интенсивность
                    distance: 10,       // Короче луч — меньше нагрузки
                });
            }
            else if (window.innerWidth < 568) {
                setLightProps({
                    position: [0, 13, 3], // Ближе к центру, меньше высота и глубина
                    angle: 1,         // Уменьшаем угол, чтобы не освещало слишком много
                    intensity: 50,      // Снижаем интенсивность
                    distance: 10,       // Короче луч — меньше нагрузки
                });
            }
            else if (window.innerWidth < 668) {
                setLightProps({
                    position: [0, 12, 3], // Ближе к центру, меньше высота и глубина
                    angle: 1,         // Уменьшаем угол, чтобы не освещало слишком много
                    intensity: 50,      // Снижаем интенсивность
                    distance: 10,       // Короче луч — меньше нагрузки
                });
            }
            else if (window.innerWidth < 768) {
                setLightProps({
                    position: [0, 10, 3], // Ближе к центру, меньше высота и глубина
                    angle: 1,         // Уменьшаем угол, чтобы не освещало слишком много
                    intensity: 50,      // Снижаем интенсивность
                    distance: 10,       // Короче луч — меньше нагрузки
                });
            }
            else if (window.innerWidth < 868) {
                setLightProps({
                    position: [0, 8, 3], // Ближе к центру, меньше высота и глубина
                    angle: 1,         // Уменьшаем угол, чтобы не освещало слишком много
                    intensity: 50,      // Снижаем интенсивность
                    distance: 10,       // Короче луч — меньше нагрузки
                });
            } else {
                // Десктоп
                setLightProps({
                    position: [0, 6, 5],
                    angle: 3,
                    intensity: 20,
                    distance: 20,
                });
            }
        };

        updateLightProps(); // Инициализация при монтировании
        window.addEventListener('resize', updateLightProps);

        return () => {
            window.removeEventListener('resize', updateLightProps);
        };
    }, []);

    return lightProps;
};