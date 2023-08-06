'use client'

import { headers } from "next/dist/client/components/headers"
import { useEffect, useState } from "react"
import Loading from "../components/loading"

export default function Login() {
    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const [error, setError] = useState(false)
    const [formLoading, setFormLoading] = useState(false)

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
        return <div className="bg-background text-text h-screen">
            <p>Welcome admin!</p>
            <button onClick={logout}>Logout</button>
        </div>
    } else {
        return <div className="bg-background h-screen flex flex-col justify-center items-center">
            <div className="hover:scale-105 hover:drop-shadow-[0px_0px_30px_rgba(54,23,53,0.5)] ease-in-out duration-500 mt-auto mb-auto flex flex-col gap-10 bg-secondary w-[70vmin] md:w-[50vmin] md:h-[50vmin] rounded-md p-10 items-center justify-center">
                <h1 className="text-text text-5xl text-center font-ubuntu">Admin Login</h1>
                <form onSubmit={submit} className="flex flex-col text-text font-poppins w-11/12 md:w-2/3">
                    <label>Email ID</label>
                    <input className="text-black pl-2 rounded-sm" placeholder="Email ID" type="email" onChange={emailChange} value={email} required></input>
                    <label className="mt-3">Password</label>
                    <input className="text-black pl-2 rounded-sm" placeholder="Password" type="password" onChange={passwordChange} value={password} required></input>
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