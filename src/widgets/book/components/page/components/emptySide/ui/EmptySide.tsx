import { Text } from '@react-three/drei';

export const EmptySide = (backSide = false) => {
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