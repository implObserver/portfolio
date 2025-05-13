import { useEffect, useState, useRef } from 'react';
import { animated, useSpring } from '@react-spring/three';
import type { ThreeEvent } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { Text, useTexture } from '@react-three/drei';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { bookActions, selectBook } from '@/services/slices/book';
import { type Project } from '@/widgets/book/lib/const/projects';
import * as THREE from 'three';
import { ProjectSide } from '../components/projectSide';
import { EmptySide } from '../components/emptySide';

interface Page3DProps {
    positionZ: number;
    index: number;
    projects: Project[];
}

export const Page3D = ({ positionZ, index, projects }: Page3DProps) => {
    const book = useSelector(selectBook);
    const dispatch = useAppDispatch();
    const [flipped, setFlipped] = useState(false);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    // Загрузка текстур для бумаги
    const [nonFlippedTexture] = useTexture([
        'flipped.png',
    ]);

    const different = book.total_leave - index;
    const koef = different * book.baze_z + book.baze_z * (book.total_leave + 3);
    const maxPage = different * 2;
    const minPage = maxPage - 1;

    const { currentPage, currentLeave, isBookmark, isOpen, isFinished } = book;

    useEffect(() => {
        if (index === currentLeave && !isBookmark) {
            dispatch(bookActions.setBookmark(true));
            if (currentPage === maxPage) setFlipped(true);
        } else if (index > currentLeave && !isBookmark) {
            setFlipped(true);
        }
        else if ((index < currentLeave || index < 0) && !isBookmark) {
            setFlipped(false);
        }
    }, [isBookmark, currentLeave, currentPage, dispatch, index, maxPage]);

    // Обновление текстуры при изменении состояния flipped


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
                    ref={materialRef}
                    side={THREE.DoubleSide}
                    map={nonFlippedTexture}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {projects[1] && ProjectSide(projects[1], true)}
            {projects[0] && ProjectSide(projects[0], false)}

            {!projects[0] && EmptySide(false)}
            {/* Номера страниц */}
            <Text
                position={[-2, -2.6, 0.01]}
                rotation-y={flipped ? 0 : Math.PI}
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {maxPage}
            </Text>
            <Text
                position={[-2, -2.6, -0.02]}
                rotation-y={Math.PI}
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

/*
import { useEffect, useState, useRef } from 'react';
import { animated, useSpring } from '@react-spring/three';
import type { ThreeEvent } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { Text, useTexture } from '@react-three/drei';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { bookActions, selectBook } from '@/services/slices/book';
import { type Project } from '@/widgets/book/lib/const/projects';
import { LitImage } from '@/shared/ui/litImageProps';
import * as THREE from 'three';

interface Page3DProps {
    positionZ: number;
    index: number;
    projects: Project[];
}

export const Page3D = ({ positionZ, index, projects }: Page3DProps) => {
    const book = useSelector(selectBook);
    const dispatch = useAppDispatch();
    const [flipped, setFlipped] = useState(false);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    // Загрузка текстур для бумаги
    const [nonFlippedTexture, fleronTexture] = useTexture([
        'flipped.png',
        'fleron.png',   // Текстура для перевернутой страницы
    ]);

    const different = book.total_leave - index;
    const koef = different * book.baze_z + book.baze_z * (book.total_leave + 3);
    const maxPage = different * 2;
    const minPage = maxPage - 1;

    const { currentPage, currentLeave, isBookmark, isOpen, isFinished } = book;

    useEffect(() => {
        if (index === currentLeave && !isBookmark) {
            dispatch(bookActions.setBookmark(true));
            if (currentPage === maxPage) setFlipped(true);
        } else if (index > currentLeave && !isBookmark) {
            setFlipped(true);
        }
    }, [isBookmark, currentLeave, currentPage, dispatch, index, maxPage]);

    // Обновление текстуры при изменении состояния flipped


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

    const renderProjectSide = (project: Project, backSide = false) => {
        const zOffset = backSide ? -0.03 : 0.03;
        const rot = backSide ? 3.14 : 0;
        const z = backSide ? -1 : 1;
        return (
            <>
                <LitImage
                    url={project.imageUrl}
                    position={[-2, 1.5, zOffset]}
                    rotationY={rot}
                    scale={[3.5, 2.5, z]}
                    onClick={() => window.open(project.siteUrl, '_blank')}
                />

                <mesh position={[-2, -0.06, zOffset]} rotation={[0, rot, 0]} scale={[3.5, 2.5, 1]}>
                    <planeGeometry args={[0.7, 0.6]} />
                    <meshBasicMaterial map={fleronTexture} transparent side={THREE.DoubleSide} />
                </mesh>

                <Text
                    position={[-2, -0.5, zOffset]}
                    rotation-y={rot}
                    fontSize={0.18}
                    maxWidth={3.4}
                    color="black"
                    anchorX="center"        // Выравнивание по центру по оси X
                    anchorY="middle"        // Выравнивание по центру по оси Y         // Ограничение ширины для центрирования
                    lineHeight={1.5}         // Межстрочное расстояние
                >
                    {project.description}
                </Text>

                <mesh position={[-2, -1.15, zOffset]} rotation={[0, rot, 0]} scale={[3.5, 2.5, 1]}>
                    <planeGeometry args={[0.9, 0.9]} />
                    <meshBasicMaterial map={fleronTexture} transparent side={THREE.DoubleSide} />
                </mesh>

                <Text
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'default')}
                    position={[-3, -2.4, zOffset]}
                    rotation-y={rot}
                    fontSize={0.14}
                    color="blue"
                    onClick={() => window.open(project.siteUrl, '_blank')}
                >
                    🔗 Сайт
                </Text>
                <Text
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'default')}
                    position={[-1, -2.4, zOffset]}
                    rotation-y={rot}
                    fontSize={0.14}
                    color="blue"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                >
                    🐙 GitHub
                </Text>
                <Text
                    position={[-2, -1.7, zOffset]}
                    rotation-y={rot}
                    fontSize={0.12}
                    maxWidth={3.5}
                    color="black"
                >
                    🧱 {project.stack.join(', ')}
                </Text>
            </>
        );
    };

    const renderEmptyProject = (backSide = false) => {
        const zOffset = backSide ? -0.03 : 0.03;
        const rot = backSide ? Math.PI : 0;

        return (
            <Text
                position={[-2, 1, zOffset]}
                rotation-y={rot}
                fontSize={0.18}
                maxWidth={3.5}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {'Место для нового проекта! ;)'}
            </Text>
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
                    ref={materialRef}
                    side={THREE.DoubleSide}
                    map={nonFlippedTexture}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {!projects[0] && renderEmptyProject(false)}
            {projects[0] && renderProjectSide(projects[0], false)}
            {projects[1] && renderProjectSide(projects[1], true)}

            {/* Номера страниц *//*}
<Text
position={[-2, -2.6, 0.01]}
rotation-y={flipped ? 0 : Math.PI}
fontSize={0.2}
color="black"
anchorX="center"
anchorY="middle"
>
{maxPage}
</Text>
<Text
position={[-2, -2.6, -0.02]}
rotation-y={Math.PI}
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
*/