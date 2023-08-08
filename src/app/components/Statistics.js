'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Statistics() {
    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    const [hostels, setHostels] = useState({loading: true, value: 0})
    const [registered, setRegistered] = useState({loading: true, value: 0})
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        fetch(baseURL+"/api/stats/hostels")
            .then((res) => { return res.json() })
            .then((resJSON) => {
                let newHostels = {loading: false, value: resJSON.count}
                setHostels(newHostels)
            })
        fetch(baseURL+"/api/stats/registered")
            .then((res) => { return res.json() })
            .then((resJSON) => {
                let newRegistered = {loading: false, value: resJSON.count}
                setRegistered(newRegistered)
            })
    }

    return <div>
        <div className="mx-4 flex flex-row gap-4">
            <div className="cursor-pointer flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Registered Students</h1>
                {registered.loading ? <div className="mt-auto h-8 w-8 animate-spin border-primary border-4 border-t-transparent rounded-[100%]"></div> : <h1 className="font-poppins text-5xl mt-auto">{registered.value}</h1>}                
            </div>
            <div onClick={() => {router.push("/admin/hostel")}} className="cursor-pointer flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Hostels</h1>
                {hostels.loading ? <div className="mt-auto h-8 w-8 animate-spin border-primary border-4 border-t-transparent rounded-[100%]"></div> : <h1 className="font-poppins text-5xl mt-auto">{hostels.value}</h1>}
            </div>
        </div>
        <div className="mx-4 flex flex-row gap-4">
            <div className="flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Alloted Students</h1>
                <h1 className="font-poppins text-5xl mt-auto">0</h1>
            </div>
            <div className="flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Current Allotment</h1>
                <h1 className="font-poppins text-4xl mt-auto text-red-400">None</h1>
            </div>
        </div>
    </div>
}