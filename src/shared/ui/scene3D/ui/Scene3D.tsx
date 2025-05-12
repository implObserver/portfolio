import { Canvas} from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

export const FoggyScene = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#111820', 0.08); // цвет и плотность
          scene.background = new THREE.Color('#111820'); // фон совпадает с туманом
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <Suspense fallback={<Html>Загрузка...</Html>}>
          {children}
        </Suspense>

        {/* Можно добавить атмосферу */}
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};