import ticTacToeImage3 from '@/shared/assets/projects/ticTacToe/ticTacToe_scale,w_1318.webp';
import battleShipImage3 from '@/shared/assets/projects/battleShip/battleShip_znkt60_c_scale,w_1318.webp';
import knightTravelersImage3 from '@/shared/assets/projects/knightTravelers/knightTravelers_ipiv1f_c_scale,w_1318.webp';
import memoryCardImage3 from '@/shared/assets/projects/memoryCard/memoryCard_uutnw8_c_scale,w_1195.webp';
import blogApiImage3 from '@/shared/assets/projects/blogApi/blogApi_oop04s_c_scale,w_1237.webp';
import passwordManagerImage1 from '@/shared/assets/projects/passwordManager/passwordManager_fhreup_c_scale,w_1083.webp';
import testProductsImage1 from '@/shared/assets/projects/testProduct/screen.png';
import testTodoImage1 from '@/shared/assets/projects/testTodo/testTodo.png';
import oldBusinessCardImage1 from '@/shared/assets/projects/oldBusinessCard/oldBusinessCard_violjy_c_scale,w_1244.webp';
import fabrica from '@/shared/assets/projects/fabrica_of_projects/Вставленное изображение.png';
import autoPlusMagazine from '@/shared/assets/projects/autoPlusMagazine/Вставленное изображение.png';
import noimage from '@/shared/assets/noimage.png';
import oldBusinessCardImage2 from '@/shared/assets/projects/buisness_card/Вставленное изображение.png'
import fullstackTODOImage from '@/shared/assets/projects/fullstackTODO/Вставленное изображение.png'

export type Project = {
    imageUrl?: string;
    siteUrl?: string;
    githubUrl?: string;
    description?: string;
    stack?: string[];
    chapter?: string,
    type: string,
};

export const emptyProject: Project = {
    imageUrl: '',
    siteUrl: '',
    githubUrl: '',
    description: 'Место для еще одного проекта! ;)',
    stack: [''],
    type: 'project',

}
export const projects: Project[] = [
    {
        imageUrl: oldBusinessCardImage1,
        siteUrl: 'https://implobserver.github.io/homepage/',
        githubUrl: 'https://github.com/implObserver/homepage',
        description: 'Мой первый сайт-визитка. Без React и FSD, сложен для масштабирования.',
        stack: ['Vanilla JS', 'HTML', 'CSS'],
        type: 'project',
    },
    {
        imageUrl: oldBusinessCardImage2,
        siteUrl: 'https://observerbusiness-card.netlify.app/',
        githubUrl: 'https://github.com/implObserver/Business_card',
        description: 'Мой второй сайт-визитка',
        stack: ['React', 'FSD'],
        type: 'project',
    },
    {
        chapter: 'Список версий моих портфолио',
        type: 'text',
    },
    {
        chapter: 'Сайты-визитки',
        type: 'chapter',
    },
    {
        imageUrl: ticTacToeImage3,
        siteUrl: 'https://implobserver.github.io/TicTacToe/',
        githubUrl: 'https://github.com/implObserver/TicTacToe',
        description: 'Крестики-нолики. Оффлайн игра до 4 игроков. Присутствует непобедимый min-max алгоритм.',
        stack: ['Vanilla JS'],
        type: 'project',
    },
    {
        imageUrl: battleShipImage3,
        siteUrl: 'https://implobserver.github.io/BattleShip/',
        githubUrl: 'https://github.com/implObserver/BattleShip',
        description: 'Морской бой. Оффлайн, 2 игрока. Классический русский формат.',
        stack: ['Vanilla JS'],
        type: 'project',
    },
    {
        imageUrl: knightTravelersImage3,
        siteUrl: 'https://implobserver.github.io/KnightsTravails/',
        githubUrl: 'https://github.com/implObserver/KnightsTravails',
        description: 'Визуализация кратчайшего пути конём на шахматной доске с использованием графа.',
        stack: ['Vanilla JS'],
        type: 'project',
    },
    {
        imageUrl: memoryCardImage3,
        siteUrl: 'https://memorycardgamepokemon.netlify.app/',
        githubUrl: 'https://github.com/implObserver/MemoryCard',
        description: 'Игра "Запомни карту". Написана на React. Используется Redux Toolkit и FSD.',
        stack: ['React', 'Redux Toolkit', 'FSD'],
        type: 'project',
    },
    {
        imageUrl: blogApiImage3,
        siteUrl: 'https://blogapifront.netlify.app/',
        githubUrl: 'https://github.com/implObserver/Blog_API_Solutions',
        description: 'Fullstack блог с авторизацией, конструктором постов, двумя фронтендами и сервером на Express.',
        stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
        type: 'project',
    },
    {
        chapter: 'Список пет-проектов, которые делал в процессе своего обучения',
        type: 'text',
    },
    {
        chapter: 'Пет-проекты',
        type: 'chapter',
    },
    {
        imageUrl: passwordManagerImage1,
        siteUrl: 'https://ultimatepasswordmanager.netlify.app/',
        githubUrl: 'https://github.com/implObserver/shoppingCart_backEnd-microservices',
        description: 'Простой менеджер паролей. Только фронт-енд.',
        stack: ['React', 'Redux Toolkit/Persist', 'SPA', 'Hybrid pseudoservices FSD (собственная разработка)'],
        type: 'project',
    },
    {
        imageUrl: testProductsImage1,
        siteUrl: 'https://superb-llama-93e7c0.netlify.app/',
        githubUrl: 'https://github.com/implObserver/testProducts/tree/main',
        description: 'Простой магазин. Только фронт-енд. Товары получены из Platzi Fake Store API.',
        stack: ['React', 'Redux Toolkit/Persist', 'SPA', 'Hybrid pseudoservices FSD (собственная разработка)'],
        type: 'project',
    },
    {
        imageUrl: testTodoImage1,
        siteUrl: 'https://sunny-marigold-d035ca.netlify.app/',
        githubUrl: 'https://github.com/implObserver/testTODO',
        description: 'Простой задачник. Только фронт-енд.',
        stack: ['React', 'Redux Toolkit/Persist', 'SPA', 'Hybrid pseudoservices FSD (собственная разработка)'],
        type: 'project',
    },
    {
        imageUrl: fullstackTODOImage,
        siteUrl: 'https://github.com/implObserver/backend',
        githubUrl: 'https://github.com/implObserver/backend',
        description: 'Fullstack TODO List Management System вторая версия бэка на NestJS',
        stack: [ 'TypeScript', 'JWT HttpOnly', 'Nest.js', 'PostgreSQL', 'Prisma'],
        type: 'project',
    },
    {
        imageUrl: fullstackTODOImage,
        siteUrl: 'https://github.com/implObserver/testFullstackTODO',
        githubUrl: 'https://github.com/implObserver/testFullstackTODO',
        description: 'Fullstack TODO List Management System',
        stack: ['React', 'NextJS', 'Tailwind', 'Redux Toolkit/persist', 'FSD', 'TypeScript', 'RTK Query', 'JWT HttpOnly', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
        type: 'project',
    },
    {
        chapter: 'Список выполненных тетсовых заданий',
        type: 'text',
    },
    {
        chapter: 'Тестовые задания',
        type: 'chapter',
    },
    {
        imageUrl: fabrica,
        siteUrl: 'https://fabrica-frontend-react.vercel.app/',
        githubUrl: 'https://github.com/salfa-ru/fabrica_frontend_react',
        description: 'Участие в разработке сайта. Личный кабинет стартапера на этапе MVP-1. Рефакторинг архитектуры.',
        stack: ['NextJS', 'Tailwind', 'TypeScript', 'RTK Query'],
        type: 'project',
    },
    {
        imageUrl: autoPlusMagazine,
        siteUrl: 'https://aplys.ru/products?page=1',
        githubUrl: 'https://github.com/implObserver/autoPlusMagazine',
        description: 'Упрощённый сайт-магазин автозапчастей. Без личного кабинета.',
        stack: ['React', 'Tailwind', 'TypeScript', 'RTK Query'],
        type: 'project',
    },
    {
        imageUrl: noimage,
        siteUrl: 'https://github.com/implObserver/priceseller',
        githubUrl: 'https://github.com/implObserver/priceseller',
        description: 'Участие в разработке системы учёта торговли.',
        stack: ['React', 'NextJS', 'Tailwind', 'FSD', 'TypeScript', 'RTK Query', 'JWT HttpOnly', 'Laravel', 'SWAGGER и DOXYGEN'],
        type: 'project',
    },
    {
        chapter: 'Список проектов, освещающих мой рабочий опыт',
        type: 'text',
    },
    {
        chapter: 'Профессиональная деятельность',
        type: 'chapter',
    },
];