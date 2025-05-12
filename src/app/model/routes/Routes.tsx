import { type ComponentType, type ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

// Тип для динамического импорта страниц
type PageModule = { default: ComponentType<unknown> };

// Ищем все страницы по пути ../routes/**/*.tsx
const pages = import.meta.glob("../../../routes/**/*.tsx") as Record<
  string,
  () => Promise<PageModule>
>;
console.log("Found page modules:", pages);
/**
 * Преобразует путь к файлу в URL-маршрут
 */
function toRoutePath(filePath: string): string {
  return filePath
    .replace("../../../routes", "")
    .replace(/\/page\.tsx$/, "")
    .replace(/\[([^\]]+)\]/g, ":$1")
    .replace(/^\//, "") || "/";
}

/**
 * Ищет все Layout.tsx в цепочке родительских папок
 */
async function getLayoutsForPath(filePath: string): Promise<ComponentType<{ children: ReactNode }>[]> {
  const segments = filePath
    .replace("../routes", "")
    .replace("/page.tsx", "")
    .split("/")
    .filter(Boolean);

  const layouts: ComponentType<{ children: ReactNode }>[] = [];
  let pathAccumulator = "../../../routes";

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    pathAccumulator += `/${segment}`;

    try {
      const layoutPath = `${pathAccumulator}/Layout.tsx`;
      const module = await import(layoutPath);
      if (module.default) {
        layouts.push(module.default);
      }
    } catch {
      // Layout не найден — пропускаем
    }
  }

  return layouts;
}

/**
 * Генерируем маршруты
 */
export const routes: RouteObject[] = Object.entries(pages).map(([filePath, loader]) => {
  const routePath = toRoutePath(filePath);
  console.log('dadad')
  return {
    path: routePath,
    lazy: async () => {
      const pageModule = await loader();
      const PageComponent = pageModule.default;

      const layouts = await getLayoutsForPath(filePath);

      try {
        const globalLayoutModule = await import("../../../routes/Layout.tsx");
        const GlobalLayout = globalLayoutModule.default;
        if (!layouts.includes(GlobalLayout)) {
          layouts.unshift(GlobalLayout);
        }
      // eslint-disable-next-line no-empty
      } catch {
        
      }

      // Создаём компонент, обёрнутый в Layout'ы
      const WrappedComponent = () => {
        return layouts.reduceRight(
          (children, Layout) => <Layout>{children}</Layout>,
          <PageComponent />
        );
      };

      return { Component: WrappedComponent };
    },
  };
});