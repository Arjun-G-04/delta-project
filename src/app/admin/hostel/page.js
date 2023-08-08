'use client'

import AdminHeader from "@/app/components/AdminHeader";
import Loading from "@/app/components/loading";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Hostel() {
    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const [hostel, setHostel] = useState([])
    const [hostelLoading, setHostelLoading] = useState(true)
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
        getHostels()
    }, [])

    function getHostels() {
        fetch(baseURL+"/api/hostel")
            .then((res) => { return res.json() })
            .then((resJSON) => {
                setHostel(resJSON.hostels)
                setHostelLoading(false)
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
            return <div className="bg-background h-screen overflow-scroll">
                <AdminHeader logout={logout}/>
                <h1 className="font-ubuntu text-text ml-4 mt-5 text-3xl">Hostels</h1>
                {hostelLoading
                    ? <div className="mt-5 mx-auto h-8 w-8 animate-spin border-primary border-4 border-t-transparent rounded-[100%]"></div>
                    : ""
                }
                {hostel.length && !hostelLoading === 0
                    ? <div className="text-text font-poppins mx-auto mt-5 text-center">No hostels added yet</div>
                    : <div>
                        {hostel.map((e) => {
                            return <div className="text-text font-poppins mt-4 mx-4 bg-primary/40 border-2 border-primary rounded-md py-3 px-2">
                                <div>{e.name}</div>
                            </div>
                        })}
                    </div>
                }
            </div>
        } else {
            router.push("/admin")
        }
    }
}