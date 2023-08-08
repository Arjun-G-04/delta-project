'use client'

import { useEffect, useState } from "react"
import Loading from "../components/loading"
import StudentHeader from "../components/StudentHeader"
import { useRouter } from "next/navigation"
import { AiFillEdit } from "react-icons/ai"

export default function Profile() {
    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const [userDetails, setUserDetails] = useState(null)
    const router = useRouter()
    
    useEffect(() => {
        getInitialData()
    }, [])
    
    function getInitialData() {
        setLoading(true)
        const id = localStorage.getItem("id")
        if (id) {
          const url = baseURL+`/api/home/${id}`
          fetch(url)
            .then(async (res) => {
              const resJSON = await res.json()
              if (resJSON.auth) {
                if (resJSON.created) {
                  setUserDetails(resJSON.userDetails)
                  setAuth(true)
                }
              }
              setLoading(false)
            })
        } else {
          setLoading(false)
        }
    }

    function logout() {
        setLoading(true)
        const id = localStorage.getItem('id')
        const url = process.env.NODE_ENV === 'production' ? baseURL+`/api/home/${id}` : `http://localhost:3000/api/home/${id}`
        fetch(url, {
          method: "DELETE"
        })
          .then((res) => {
            localStorage.removeItem("id")
            setAuth(false)
            setUserDetails(null)
            getInitialData()
          })
    }

    if (loading) {
        return <Loading />
    } else if (auth) {
        return <div className="bg-background h-screen overflow-scroll">
            <StudentHeader logout={logout} name={userDetails.name}/>
            <div className="p-4 text-text rounded-md mt-5 mx-4 flex flex-row items-center bg-primary/20 backdrop-blur-sm border-2 border-primary">
                <h1 className="font-ubuntu text-2xl">Name</h1>
                <h1 className="ml-auto font-poppins text-2xl text-green-500">{userDetails.name}</h1>
            </div>
            <div className="p-4 text-text rounded-md mt-2 mx-4 flex flex-row items-center bg-primary/20 backdrop-blur-sm border-2 border-primary">
                <h1 className="font-ubuntu text-2xl">Roll No</h1>
                <h1 className="ml-auto font-poppins text-2xl text-green-500">{userDetails.rollno}</h1>
            </div>
            <div className="p-4 text-text rounded-md mt-2 mx-4 flex flex-row items-center bg-primary/20 backdrop-blur-sm border-2 border-primary">
                <h1 className="font-ubuntu text-2xl">Gender</h1>
                <h1 className="ml-auto font-poppins text-2xl text-green-500">{userDetails.gender}</h1>
            </div>
            <div className="p-4 text-text rounded-md mt-2 mx-4 flex flex-row items-center bg-primary/20 backdrop-blur-sm border-2 border-primary">
                <h1 className="font-ubuntu text-2xl">Year</h1>
                <h1 className="ml-auto font-poppins text-2xl text-green-500">{userDetails.year}</h1>
            </div>
            <div className="p-4 text-text rounded-md mt-2 mx-4 flex flex-row items-center bg-primary/20 backdrop-blur-sm border-2 border-primary">
                <h1 className="font-ubuntu text-2xl">Department</h1>
                <h1 className="ml-auto font-poppins text-2xl text-fuchsia-400">{userDetails.department}</h1>
            </div>
            <div className="p-4 text-text rounded-md mt-2 mx-4 flex flex-row items-center bg-primary/20 backdrop-blur-sm border-2 border-primary">
                <h1 className="font-ubuntu text-2xl">Languages</h1>
                <h1 className="ml-auto font-poppins text-2xl text-fuchsia-400 text-end">{userDetails.langs}</h1>
            </div>
            <div className="p-4 text-text rounded-md mt-2 mx-4 flex flex-col bg-primary/20 backdrop-blur-sm border-2 border-primary">
                <div className="flex flex-row items-center">
                    <h1 className="font-ubuntu text-2xl">Bio</h1>
                    <AiFillEdit className="ml-auto" />
                </div>
                <h1 className="mt-2 font-poppins text-lg text-fuchsia-400 break-all">{userDetails.description}</h1>
            </div>
        </div>
    } else {
        router.push("/")
    }
}