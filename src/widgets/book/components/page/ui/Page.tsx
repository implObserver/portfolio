import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import type { ThreeEvent } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { bookActions, selectBook } from '@/services/slices/book';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Image, Text } from '@react-three/drei';
import type { Project } from '@/widgets/book/lib/const/projects';

interface Page3DProps {
    positionZ: number;
    project?: Project;
}

export const Page3D = ({ positionZ, project, index }: Page3DProps & { index: number }) => {
    const book = useSelector(selectBook);
    const [flipped, setFlipped] = useState(false);
    const dispatch = useAppDispatch();
    const different = (book.total_leave - index);
    const koef = different * book.baze_z +  book.baze_z * (book.total_leave + 3);
    const maxPage = different * 2;
    const minPage = maxPage - 1;
    const currentPage = book.currentPage;
    const currentLeave = book.currentLeave;

    useEffect(() => {
        if (index === currentLeave && !book.isBookmark) {
            dispatch(bookActions.setBookmark(true))
            if (currentPage === maxPage) {
                setFlipped(true);
            }
        }
        else if (index > currentLeave && !book.isBookmark) {
            setFlipped(true);
        }
    }, [book.isBookmark, currentLeave, currentPage, dispatch, index, maxPage, minPage])

    const { rotationY, z } = useSpring({
        z: flipped
            ? koef
            : positionZ,
        rotationY: !book.isOpen && book.isFinished ? 0 : flipped ? -0.2 : Math.PI,
        config: { mass: 0.05, tension: 120, friction: 30 },
        onStart: () => dispatch(bookActions.startAnimation()),
        onRest: () => dispatch(bookActions.endAnimation()),
    });

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        console.log(koef)
        e.stopPropagation();
        if (!book.isOpen || currentLeave - index > 1) return;
        if (book.isAnimating && book.prevLeave > book.currentLeave) {
            console.log('w')
        }
        setFlipped(prev => !prev);
        dispatch(bookActions.setCurrentLeave(index))
        dispatch(bookActions.setCurrentPage(flipped ? minPage : maxPage))
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
                <meshStandardMaterial color="white" side={2} />
            </mesh>

            {project && (
                <>
                    <Image
                        url={project.imageUrl}
                        position={[-2, 1.2, 0.03]}
                        scale={[2.5, 1.5]}
                    />
                    <Text
                        position={[-2, -0.5, 0.03]}
                        fontSize={0.18}
                        maxWidth={3.5}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {project.description}
                    </Text>
                    <Text
                        position={[-2, -1.4, 0.03]}
                        fontSize={0.14}
                        color="blue"
                        onClick={() => window.open(project.siteUrl, '_blank')}
                    >
                        🔗 Сайт
                    </Text>
                    <Text
                        position={[-2, -1.7, 0.03]}
                        fontSize={0.14}
                        color="blue"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                        🐙 GitHub
                    </Text>
                    <Text
                        position={[-2, -2, 0.03]}
                        fontSize={0.12}
                        color="gray"
                    >
                        🧱 {project.stack.join(', ')}
                    </Text>
                </>
            )}
            {/* Номер страницы на лицевой стороне */}
            <Text
                position={[-2, 0, 0.01]} // Немного выше поверхности страницы
                rotation-y={flipped ? 0 : Math.PI} // Ориентация текста
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {maxPage}
            </Text>

            {/* Номер страницы на обратной стороне (виден при перевороте) */}
            <Text
                position={[-2, 0, -0.01]} // Немного ниже поверхности страницы
                rotation-y={flipped ? Math.PI : 0} // Обратная ориентация
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {minPage}
            </Text>
        </animated.group>
    );
};