import { bookActions, selectBook } from "@/services/slices/book";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { animated, useSpring } from "@react-spring/three";
import type { ThreeEvent } from "@react-three/fiber";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export const BackCover3D = ({ positionZ }: { positionZ: number }) => {
    const book = useSelector(selectBook);
    const dispatch = useAppDispatch();

    // Загружаем текстуру дважды — один для нормального отображения, другой отзеркаленный
    const texture = useLoader(THREE.TextureLoader, "back.png");
    const mirroredTexture = texture.clone();
    texture.flipY = false;
    mirroredTexture.flipY = false;

    mirroredTexture.wrapS = mirroredTexture.wrapT = THREE.RepeatWrapping;
    mirroredTexture.repeat.x = 1; // Зеркалим по горизонтали

    // Создаём материалы для всех 6 граней
    const materials = [
        new THREE.MeshStandardMaterial({ color: "#000000" }), // правая
        new THREE.MeshStandardMaterial({ color: "#000000" }), // левая
        new THREE.MeshStandardMaterial({ color: "#000000" }), // верх
        new THREE.MeshStandardMaterial({ color: "#000000" }), // низ
        new THREE.MeshStandardMaterial({ map: texture }),      // фронт (наружная сторона)
        new THREE.MeshStandardMaterial({ map: mirroredTexture }), // зад (внутренняя сторона)
    ];

    const { rotationY, z } = useSpring({
        rotationY: !book.isOpen && book.isFinished ? 0 : Math.PI,
        z: book.isOpen
            ? -0.1
            : book.isFinished
                ? (book.total_leave + 5) * book.baze_z * 2
                : positionZ,
        config: { mass: 1, tension: 120, friction: 30 },
        onStart: () => dispatch(bookActions.startAnimation()),
        onRest: () => dispatch(bookActions.endAnimation()),
    });

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (book.currentLeave !== -1) return;
        dispatch(book.isOpen ? bookActions.closeBook(true) : bookActions.openBook());
    };

    return (
        <animated.group
            rotation-y={rotationY}
            position-x={-2}
            position-y={0}
            position-z={z}
            onClick={handleClick}
        >
            <mesh position={[-2, 0, 0]} material={materials}>
                <boxGeometry args={[4, 6, 0.1]} />
            </mesh>
        </animated.group>
    );
};
