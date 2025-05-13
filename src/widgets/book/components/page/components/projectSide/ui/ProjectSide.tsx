import { HoldableLink } from "@/shared/ui/holdableLink";
import { LitImage } from "@/shared/ui/litImageProps";
import type { Project } from "@/widgets/book/lib/const/projects";
import { Text, useTexture } from "@react-three/drei";
import * as THREE from 'three';

export const ProjectSide = (project: Project, backSide = false) => {
    const zOffset = backSide ? -0.03 : 0.03;
    const rot = backSide ? 3.14 : 0;

    // Загрузка текстур для бумаги
    const [fleronTexture, chapterFleronTexture] = useTexture([
        'fleron.png',   // Текстура для перевернутой страницы
        'chapterFleron.svg'
    ]);
    if (project.type === 'project') {
        return (
            <>

                <HoldableLink
                    url={project.siteUrl ?? ''} // или другая ссылка, если нужна своя
                    position={[-2, 1.5, zOffset]}
                    rotationY={rot}
                >
                    <LitImage
                        url={project.imageUrl ?? ''}
                        position={[0, 0, 0]} // относительно HoldableLink
                        rotationY={0}
                        scale={[3.5, 2.5, backSide ? -1 : 1]}
                    />
                </HoldableLink>


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
                    🧱 {project?.stack?.join(', ') ?? ''}
                </Text>

            </>
        );
    }

    if (project.type === 'chapter') {
        return (
            <>
                <mesh position={[-2, 1, zOffset]} rotation={[0, rot, 0]} scale={[3.5, 2.5, 1]}>
                    <planeGeometry args={[0.9, 0.9]} />
                    <meshBasicMaterial map={chapterFleronTexture} transparent side={THREE.DoubleSide} />
                </mesh>

                <Text
                    position={[-2, 0, zOffset]}
                    rotation-y={rot}
                    fontSize={0.18}
                    maxWidth={3.4}
                    color="black"
                    // Выравнивание по центру по оси Y         // Ограничение ширины для центрирования
                    lineHeight={1.5}         // Межстрочное расстояние
                >
                    {project.chapter}
                </Text>
            </>
        )
    }

    if (project.type === 'text') {
        return (
            <Text
                position={[-2, 0, zOffset]}
                rotation-y={rot}
                fontSize={0.18}
                maxWidth={3.4}
                color="black"
                // Выравнивание по центру по оси Y         // Ограничение ширины для центрирования
                lineHeight={1.5}         // Межстрочное расстояние
            >
                {project.chapter}
            </Text>
        )
    }
};