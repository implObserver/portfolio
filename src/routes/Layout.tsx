import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid relative items-center justify-center min-h-screen overflow-hidden">
      {/* Контейнер с обрезкой (скрывает выходящий за пределы экрана фон) */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/bg.png')",
            filter: "brightness(0.6) contrast(0.95)",
            transform: "scale(1.1)",
            width: "100%",
            height: "100%",

            backgroundPosition: "40% 30%",
          }}
        />
      </div>

      {/* Контент поверх */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}