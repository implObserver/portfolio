import ticTacToeImage3 from '@/shared/assets/projects/ticTacToe/ticTacToe_scale,w_1318.webp';
import battleShipImage3 from '@/shared/assets/projects/battleShip/battleShip_znkt60_c_scale,w_1318.webp';
import knightTravelersImage3 from '@/shared/assets/projects/knightTravelers/knightTravelers_ipiv1f_c_scale,w_1318.webp';
import memoryCardImage3 from '@/shared/assets/projects/memoryCard/memoryCard_uutnw8_c_scale,w_1195.webp';
import blogApiImage3 from '@/shared/assets/projects/blogApi/blogApi_oop04s_c_scale,w_1237.webp';

export type Project = {
    imageUrl: string;
    siteUrl: string;
    githubUrl: string;
    description: string;
    stack: string[];
};

export const emptyProject: Project = {
    imageUrl: '',
    siteUrl: '',
    githubUrl: '',
    description: 'Место для еще одного проекта! ;)',
    stack: [''],
}
export const projects: Project[] = [
    {
        imageUrl: ticTacToeImage3,
        siteUrl: 'https://implobserver.github.io/TicTacToe/',
        githubUrl: 'https://github.com/implObserver/TicTacToe',
        description: 'Крестики-нолики. Оффлайн игра до 4 игроков. Присутствует непобедимый min-max алгоритм.',
        stack: ['Vanilla JS'],
    },
    {
        imageUrl: battleShipImage3,
        siteUrl: 'https://implobserver.github.io/BattleShip/',
        githubUrl: 'https://github.com/implObserver/BattleShip',
        description: 'Морской бой. Оффлайн, 2 игрока. Классический русский формат.',
        stack: ['Vanilla JS'],
    },
    {
        imageUrl: knightTravelersImage3,
        siteUrl: 'https://implobserver.github.io/KnightsTravails/',
        githubUrl: 'https://github.com/implObserver/KnightsTravails',
        description: 'Визуализация кратчайшего пути конём на шахматной доске с использованием графа.',
        stack: ['Vanilla JS'],
    },
    {
        imageUrl: memoryCardImage3,
        siteUrl: 'https://memorycardgamepokemon.netlify.app/',
        githubUrl: 'https://github.com/implObserver/MemoryCard',
        description: 'Игра "Запомни карту". Написана на React. Используется Redux Toolkit и FSD.',
        stack: ['React', 'Redux Toolkit', 'FSD'],
    },
    {
        imageUrl: blogApiImage3,
        siteUrl: 'https://blogapifront.netlify.app/',
        githubUrl: 'https://github.com/implObserver/Blog_API_Solutions',
        description: 'Fullstack блог с авторизацией, конструктором постов, двумя фронтендами и сервером на Express.',
        stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    }
];