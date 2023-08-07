import { FiLogOut } from "react-icons/fi"

export default function AdminHeader(props) {
    const {logout} = props

    return <div className="flex flex-row items-center min-h-[7.5vh] bg-secondary">
        <h1 className="font-ubuntu ml-3 text-2xl text-text">Hostel Administrator</h1>
        <div onClick={logout} className="ml-auto mr-3"><FiLogOut className="text-primary w-7 h-7 cursor-pointer hover:scale-110 duration-500 ease-in-out" /></div>
    </div>
}