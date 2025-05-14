import { ToHome } from "@/shared/ui/toHome"
import { Html } from "@react-three/drei"

export const FixedHomeButton = () => {
    return (
        <Html position={[2, 5, -5]} distanceFactor={10}>
            <ToHome />
        </Html>
    )
}