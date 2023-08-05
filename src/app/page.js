'use client'

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const redirectURI = encodeURIComponent(baseURL+"/callback")
  const loginURL = true ? 'https://auth.delta.nitt.edu/authorize?client_id=aohOCpCGUUxlBn1C&redirect_uri='+redirectURI+'&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=email+openid+profile+user&nonce=bscsbascbadcsbasccabs' : 'https://auth.delta.nitt.edu/authorize?client_id=NAIRt7G6lbmLLFpN&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=email+openid+profile+user&nonce=bscsbascbadcsbasccabs'

  useEffect(() => {
    getInitialData()
  }, [])

  function getInitialData() {
    const id = localStorage.getItem("id")
    if (id) {
      const url = process.env.NODE_ENV === 'production' ? baseURL+`/api/home/${id}` : `http://localhost:3000/api/home/${id}`
      fetch(url)
        .then(async (res) => {
          const resJSON = await res.json()
          if (resJSON.auth) {
            setUserDetails(resJSON.details)
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
        setUserDetails(null)
        getInitialData()
      })
  }

  if (loading) {
    return <div>
      <h1>Loading...</h1>
    </div>
  } else {
    if (auth) {
      return <div className="flex flex-col">
        <p>Hey you are authenticated!</p>
        <p>{userDetails.name}</p>
        <p>{userDetails.email.slice(0, 9)}</p>
        <button className="bg-primary" onClick={logout}>Logout</button>
      </div>
    } else {
      return <div className="bg-background h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col bg-secondary text-text w-[50vmin] h-[50vmin] rounded-md justify-center items-center">
          <h1>ClassNITTe</h1>
          <Link href={loginURL}><button className="bg-green-500 text-black p-3 border-green-500 border-solid border-2 hover:bg-transparent hover:text-green-500">Login with DAuth</button></Link>
        </div>
      </div>
    }
  }
}