import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { Environment, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import { generateRandomText } from '../lib/const/texts';

interface FoggySceneProps {
  children: React.ReactNode;
}

export const FoggyScene = ({ children }: FoggySceneProps) => {
  // Конфигурация текста
  const config = useMemo(() => ({
    numLines: 12,
    textColor: 'rgba(255, 255, 255, 0.6)',
    minTextSize: 0.5,
    maxTextSize: 2,
    minSpeed: 0.6,
    maxSpeed: 1.2,
    minDelay: 0,
    maxDelay: 1,
    canvasWidth: 20,
    canvasHeight: 20,
    zPosition: -5, // Глубина расположения текста
  }), []);

  // Генерация строк с уникальными параметрами
  const lines = useMemo(() =>
    Array.from({ length: config.numLines }).map((_, i) => ({
      text: generateRandomText(),
      size: config.minTextSize + Math.random() * (config.maxTextSize - config.minTextSize),
      speed: config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed),
      delay: Math.random() * config.maxDelay,
      yPos: -config.canvasHeight / 2 + (i + 0.5) * (config.canvasHeight / config.numLines),
    })),
    [config]
  );

  return (
    <div className="w-full h-full fixed top-0 left-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#111820', 0.05);
          scene.background = new THREE.Color('#111820');
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <Suspense fallback={<Html>Загрузка...</Html>}>
          {children}
        </Suspense>

        <Environment preset="night" />

        {/* Движущийся текст */}
        {lines.map((line, index) => (
          <MovingText
            key={index}
            text={line.text}
            textSize={line.size}
            textColor={config.textColor}
            positionY={line.yPos}
            delay={line.delay}
            speed={line.speed}
            canvasWidth={config.canvasWidth}
            zPosition={config.zPosition}
          />
        ))}
      </Canvas>
    </div>
  );
};

interface MovingTextProps {
  text: string;
  textSize: number;
  textColor: string;
  positionY: number;
  delay: number;
  speed: number;
  canvasWidth: number;
  zPosition: number;
}

const MovingText = ({
  text,
  textSize,
  textColor,
  positionY,
  delay,
  speed,
  canvasWidth,
  zPosition
}: MovingTextProps) => {
  const { x } = useSpring({
    from: { x: canvasWidth + 5 }, // Начинаем за правой границей
    to: { x: -canvasWidth - text.length * textSize }, // Заканчиваем за левой границей
    config: {
      duration: (canvasWidth * 1000) / speed, // Время зависит от скорости
      easing: t => t // Линейное движение
    },
    delay,
    loop: true,
    immediate: false,
  });

  return (
    <animated.group position-x={x} position-y={positionY} position-z={zPosition}>
      <Text
        fontSize={textSize}
        color={textColor}
        anchorX="left"
        anchorY="middle"
      >
        {text}
      </Text>
    </animated.group>
  );
};