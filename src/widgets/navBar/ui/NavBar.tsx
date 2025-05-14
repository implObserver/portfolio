import { useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    const clickHandle = (route: string) => {
        navigate(route)
    }
    return (
        <div className="grid gap-10 md:gap-2 text-white">
            <span className="text-5xl md:text-6xl text-center tracking-[4px]">
                СИТНИКОВ В.С.
            </span>
            <div className="grid md:flex gap-10 text-4xl md:text-4xl justify-center tracking-[4px]">
                <span onClick={() => clickHandle('/projects')} className="hover:text-indigo-500 cursor-pointer">ПРОЕКТЫ</span>
                <span onClick={() => clickHandle('/about')} className="hover:text-indigo-500 cursor-pointer">ОБО МНЕ</span>
                <span onClick={() => clickHandle('/contacts')} className="hover:text-indigo-500 cursor-pointer">КОНТАКТЫ</span>
            </div>
        </div>
    )
}