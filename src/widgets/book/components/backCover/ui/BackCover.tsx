import { bookActions, selectBook } from "@/services/slices/book";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { animated, useSpring } from "@react-spring/three";
import type { ThreeEvent } from "@react-three/fiber";
import { useSelector } from "react-redux";

export const BackCover3D = ({ positionZ }: { positionZ: number }) => {
    const book = useSelector(selectBook);
    const dispatch = useAppDispatch();

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
            <mesh position={[-2, 0, 0]}>
                <boxGeometry args={[4, 6, 0.1]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </animated.group>
    );
};