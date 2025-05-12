import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <div className="grid gap-10 md:gap-2 text-white">
            <span className="text-5xl md:text-6xl text-center tracking-[4px]">
                СИТНИКОВ В.С.
            </span>
            <div className="grid md:flex gap-10 text-4xl md:text-4xl justify-center tracking-[4px]">
                <Link to={'/projects'}>
                    <span className="hover:text-indigo-500 cursor-pointer">ПРОЕКТЫ</span>
                </Link>
                <Link to={'/about'}>
                    <span className="hover:text-indigo-500 cursor-pointer">ОБО МНЕ</span>
                </Link>
                <Link to={'/contacts'}>
                    <span className="hover:text-indigo-500 cursor-pointer">КОНТАКТЫ</span>
                </Link>
            </div>
        </div>
    )
}