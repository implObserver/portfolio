import { ArrowLeftToLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const ToHome = () => {
    const navigate = useNavigate()
    const clickHandle = () => {
        navigate('/')
    }

    return (
        <ArrowLeftToLine onClick={clickHandle} size={48} className='fixed p-2 left-0 text-white hover:text-indigo-500' />
    )
}