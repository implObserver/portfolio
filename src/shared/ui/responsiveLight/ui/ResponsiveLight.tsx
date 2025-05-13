import { SpotLight } from '@react-three/drei';
import { useResponsiveLightProps } from '../helper/hooks/useResponsiveLightProps';

export const ResponsiveSpotLight = () => {
    const { position, angle, intensity, distance } = useResponsiveLightProps();

    return (
        <SpotLight
            position={position}
            angle={angle}
            penumbra={0.7}
            intensity={intensity}
            color="#ff9901"
            distance={distance}
            decay={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            target-position={[0, 0, 0]}
        />
    );
};