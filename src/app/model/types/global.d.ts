declare module '*.css' {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module '*.jpg';
declare module '*.webp';
declare module '*.svg';
declare module '*.png';
declare module '*.json';

interface ImportMeta {
  glob: (glob: string) => Record<string, () => Promise<JSX.Element>>;
}