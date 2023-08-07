'use client'

import { useEffect, useState } from "react"
import Loading from "../components/loading"
import AdminHeader from "../components/AdminHeader"
import Statistics from "../components/Statistics"
import { MdCreate } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"
import { useRouter } from "next/navigation"

export default function Login() {
    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const [error, setError] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        fetch(baseURL+"/api/auth/admin")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.auth) {
                    setAuth(true)
                } else {
                    setAuth(false)
                }
                setLoading(false)
            })
    }, [])

    function emailChange(event) {
        setEmail(event.target.value)
    }

    function passwordChange(event) {
        setPassword(event.target.value)
    }

    function submit(event) {
        event.preventDefault()
        setFormLoading(true)
        setError(false)
        fetch(baseURL+"/api/auth/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:email, password:password})
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.auth) {
                    setAuth(true)
                } else {
                    setError(true)
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
        return <div>
            <Loading />
        </div>
    } else if (auth) {
        return <div className="flex flex-col bg-background text-text h-screen overflow-scroll">
            <AdminHeader logout={logout} />
            <Statistics />
            <div className="h-[0.5px] bg-slate-500 mt-5"></div>
            <h1 className="text-3xl font-ubuntu ml-4 mt-5">Action Center</h1>
            <div className="flex flex-row font-poppins mt-5 ml-4 gap-4">
                <button onClick={() => { router.push("/admin/hostel/add") }} className="flex flex-row justify-center items-center gap-1 hover:bg-transparent hover:text-primary border-primary border-2 px-5 py-2 rounded-md bg-primary text-black"><MdCreate /><p>Add Hostel</p></button>
                <button className="flex flex-row justify-center items-center gap-1 hover:bg-transparent hover:text-red-400 border-red-400 border-2 px-5 py-2 rounded-md bg-red-400 text-black"><AiFillDelete /> Remove Hostel</button>
            </div>
        </div>
    } else {
        return <div className="bg-background h-screen flex flex-col justify-center items-center">
            <div className="hover:scale-105 hover:drop-shadow-[0px_0px_30px_rgba(54,23,53,0.5)] ease-in-out duration-500 mt-auto mb-auto flex flex-col gap-10 bg-secondary w-[70vmin] md:w-[50vmin] md:h-[50vmin] rounded-md p-10 items-center justify-center">
                <h1 className="text-text text-5xl text-center font-ubuntu">Admin Login</h1>
                <form onSubmit={submit} className="flex flex-col text-text font-poppins w-[100%] md:w-2/3">
                    <label>Email ID</label>
                    <input className="h-8 text-black pl-2 rounded-sm" placeholder="Email ID" type="email" onChange={emailChange} value={email} required></input>
                    <label className="mt-3">Password</label>
                    <input className="h-8 text-black pl-2 rounded-sm" placeholder="Password" type="password" onChange={passwordChange} value={password} required></input>
                    {formLoading ? <div className="mx-auto mt-7 h-8 w-8 animate-spin border-primary border-4 border-t-transparent rounded-[100%]"></div> : <button className="hover:bg-transparent hover:text-primary border-primary border-2 mt-7 mx-auto px-5 py-2 rounded-md bg-primary text-black" type="submit">Submit</button>}
                    {error ? <div className="mt-4 text-red-400 text-center">Wrong email or password</div> : ""}
                </form>
            </div>
            <div>
                <p className="text-text font-poppins mb-5">Made with ♥ by Arjun</p>
            </div>
        </div>
    }
}