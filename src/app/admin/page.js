'use client'

import { headers } from "next/dist/client/components/headers"
import { useEffect, useState } from "react"

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
        return <h1>Loading</h1>
    } else if (auth) {
        return <div>
            <p>Welcome admin!</p>
            <button onClick={logout}>Logout</button>
        </div>
    } else {
        return <div>
            <h1>Teacher Login</h1>
            <form onSubmit={submit} className="flex flex-col">
                <input className="text-black" type="email" onChange={emailChange} value={email} required></input>
                <input className="text-black" type="password" onChange={passwordChange} value={password} required></input>
                {formLoading ? <p>Loading</p> : <button type="submit">Submit</button>}
                {error ? "Wrong email or password" : ""}
            </form>
        </div>
    }
}