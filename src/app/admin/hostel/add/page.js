'use client'

import AdminHeader from "@/app/components/AdminHeader"
import Loading from "@/app/components/loading"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AddHostel() {
    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [hostelName, setHostelName] = useState("")
    const [category, setCategory] = useState("")
    const [roomSize, setRoomSize] = useState("")
    const [noRooms, setNoRooms] = useState("")
    const [year, setYear] = useState("")
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    function checkAuth() {
        fetch(baseURL+"/api/auth/admin")
            .then((res) => { return res.json() })
            .then((resJSON) => {
                if (resJSON.auth) {
                    setAuth(true)
                }
                setLoading(false)
            })
    }

    function submit(e) {
        e.preventDefault()
        setFormLoading(true)
        fetch(baseURL+"/api/hostel", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: hostelName,
                category: category,
                roomSize: roomSize,
                roomsNo: noRooms,
                year: year
            })
        })
            .then((res) => {
                if (res.status === 200) {
                    setSuccess(true)
                }
                setFormLoading(false)
            })
    }

    function logout() {
        fetch(baseURL+"/api/auth/admin", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                setAuth(false)
            })
    }
    
    if (loading) {
        return <Loading />
    } else {
        if (auth) {
            return <div className="bg-background h-screen">
                <AdminHeader logout={logout} />
                <div className="mx-4 flex flex-col p-2 w-auto h-auto mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                    <h1 className="text-2xl font-ubuntu text-text">New Hostel</h1>
                    <form onSubmit={submit} className="mt-5 text-text flex flex-col font-poppins">
                        <label>Hostel Name</label>
                        <input placeholder="Hostel Name" value={hostelName} onChange={(e) => {setHostelName(e.target.value)}} type="text" className="h-8 text-black rounded-sm pl-2" required></input>
                        <label className="mt-1">Category</label>
                        <select value={category} onChange={(e) => {setCategory(e.target.value)}} className="h-8 text-black rounded-sm pl-2" required>
                            <option value="">Select category of Hostel</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                        <label className="mt-1">Room Size</label>
                        <input placeholder="Room Size" value={roomSize} onChange={(e) => {setRoomSize(e.target.value)}} className="h-8 text-black rounded-sm pl-2" type="number" required></input>
                        <label className="mt-1">Number Of Rooms</label>
                        <input placeholder="Number Of Rooms" value={noRooms} onChange={(e) => {setNoRooms(e.target.value)}} className="h-8 text-black rounded-sm pl-2" type="number" required></input>
                        <label className="mt-1">Year</label>
                        <select value={year} onChange={(e) => {setYear(e.target.value)}} className="h-8 text-black rounded-sm pl-2" required>
                            <option value="">Select Year</option>
                            <option value="First">First</option>
                            <option value="Second">Second</option>
                            <option value="Third">Third</option>
                            <option value="Fourth">Fourth</option>
                        </select>

                        {success ? <div className="mx-auto my-5">Success! Return to <Link href="/admin" className="underline text-accent">admin home</Link></div>
                            : formLoading ? <div className="mx-auto my-5 h-8 w-8 animate-spin border-primary border-4 border-t-transparent rounded-[100%]"></div>
                            : <button className="hover:bg-transparent hover:text-primary border-primary border-2 my-5 mx-auto px-5 py-2 rounded-md bg-primary text-black">Submit</button>
                        }
                    </form>
                </div>
            </div>
        } else {
            router.push("/admin")
        }
    }
}