export const texts = [
    'Опыт работы',
    'Мои проекты',
    'Пет-проекты',
    'Написал на работе',
    'Люблю кодить',
    'Портфолио',
    'Галерея моих работ',
    'Typescript',
    'React',
    'Список',
    '<3',
    ':p',
]


export const generateRandomText = () => {
    const length = 2 + Math.floor(Math.random() * 3); // 2-4 слова
    return Array.from({ length }, () => texts[Math.floor(Math.random() * texts.length)]).join(" ");
};