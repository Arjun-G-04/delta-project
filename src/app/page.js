'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import Loading from "./components/loading"

export default function Home() {
  const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const [created, setCreated] = useState(false)
  const [dauthDetails, setDauthDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [dept, setDept] = useState("")
  const [description, setDescription] = useState("")
  const [langs, setLangs] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const redirectURI = encodeURIComponent(baseURL+"/callback")
  const loginURL = process.env.NODE_ENV === 'production' ? 'https://auth.delta.nitt.edu/authorize?client_id=aohOCpCGUUxlBn1C&redirect_uri='+redirectURI+'&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=email+openid+profile+user&nonce=bscsbascbadcsbasccabs' : 'https://auth.delta.nitt.edu/authorize?client_id=NAIRt7G6lbmLLFpN&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=email+openid+profile+user&nonce=bscsbascbadcsbasccabs'

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
              setCreated(true)
              setUserDetails(resJSON.userDetails)
            }
            setDauthDetails(resJSON.details)
            setAuth(true)
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
        setDauthDetails(null)
        setUserDetails(null)
        getInitialData()
      })
  }

  function submit(e) {
    e.preventDefault()
    setFormLoading(true)
    fetch(baseURL+"/api/student/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: dauthDetails.name,
        rollno: dauthDetails.email.slice(0,9),
        department: dept,
        description: description,
        gender: dauthDetails.gender,
        year: dauthDetails.batch.split(" ")[1],
        langs: langs
      })
    })
      .then((res) => {
        getInitialData()
      })
      .catch((error) => {
        setFormLoading(false)
      })
  }

  if (loading) {
    return <div>
      <Loading />
    </div>
  } else {
    if (auth) {
      if (created) {
        return <div className="flex flex-col">
          <p>Hey you are authenticated!</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.rollno}</p>
          <p>{userDetails.dept}</p>
          <p>{userDetails.gender}</p>
          <p>{userDetails.description}</p>
          <button className="bg-primary" onClick={logout}>Logout</button>
        </div>
      } else {
        return <div className="bg-background flex flex-col h-screen">
          <div className="my-auto mx-6 md:mx-auto bg-secondary p-5 rounded-md h-auto md:w-[70vmin] text-text">
          <h1 className="font-ubuntu text-2xl">Tell us about yourself</h1>
          <form onSubmit={submit} className="flex flex-col font-poppins mt-7">
            <label>Name</label>
            <input className="h-8 rounded-sm pl-2 text-black disabled:bg-slate-400 disabled:hover:cursor-not-allowed" type="text" value={dauthDetails.name} disabled></input>
            <label className="mt-2">Roll No</label>
            <input className="h-8 rounded-sm pl-2 text-black disabled:bg-slate-400 disabled:hover:cursor-not-allowed" value={dauthDetails.email.slice(0,9)} type="text" disabled></input>
            <label className="mt-2">Gender</label>
            <input className="h-8 rounded-sm pl-2 text-black disabled:bg-slate-400 disabled:hover:cursor-not-allowed" value={dauthDetails.gender} disabled></input>
            <label className="mt-2">Languages</label>
            <input className="h-8 rounded-sm pl-2 text-black" placeholder="English, Hindi, Tamil..." value={langs} onChange={(e) => {setLangs(e.target.value)}} required></input>
            <label className="mt-2">Department</label>
            <select className="h-8 rounded-sm pl-2 text-black" value={dept} onChange={(e) => {setDept(e.target.value)}} required>
              <option value="">Select your department</option>
              <option value="CS">CS</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="ICE">ICE</option>
              <option value="PROD">PROD</option>
              <option value="MME">MME</option>
              <option value="CHE">CHE</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <label className="mt-2">About yourself</label>
            <textarea placeholder="Say some interesting things about yourself, your hobbies, interests, etc." className="rounded-sm pl-2 pt-1 text-black h-32" value={description} onChange={(e) => {setDescription(e.target.value)}} required></textarea>
            {formLoading ? <div className="mx-auto mt-5 h-8 w-8 animate-spin border-primary border-4 border-t-transparent rounded-[100%]"></div> : <button className="hover:bg-transparent hover:text-primary border-primary border-2 mt-5 mx-auto px-5 py-2 rounded-md bg-primary text-black" type="submit">Submit</button>}
          </form>
          </div>
        </div>
      }
    } else {
      return <div>
        <div className="bg-background h-screen flex flex-col items-center">
          <div className="hover:scale-105 hover:drop-shadow-[0px_0px_30px_rgba(54,23,53,0.5)] ease-in-out duration-500 mt-auto mb-auto flex flex-col gap-10 bg-secondary w-[70vmin] h-[70vmin] md:w-[50vmin] md:h-[50vmin] rounded-md p-10 items-center justify-center">
            <div><h1 className="font-ubuntu text-5xl text-text text-center">Hostel NITT</h1></div>
            <div className="">
              <Link href={loginURL}><button className="bg-green-500 rounded-md font-poppins text-black p-3 border-green-500 border-solid border-2 hover:bg-transparent hover:text-green-500">Login with DAuth</button></Link>
            </div>
          </div>
          <div>
            <p className="text-text font-poppins mb-5">Made with ♥ by Arjun</p>
          </div>
        </div>
      </div>
    }
  }
}