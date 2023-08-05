'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Callback() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    const searchParams = useSearchParams()
    const router = useRouter()
    const code = searchParams.get('code')
    const url = process.env.NODE_ENV === 'production' ? baseURL+`/api/auth/${code}` : `http://localhost:3000/api/auth/${code}`

    useEffect(() => {
        fetch(url)
            .then(async(res) => {
                const resJSON = await res.json()
                if (resJSON.auth) {
                    localStorage.setItem("id", resJSON.id)
                    router.push("/")
                } else {
                    router.push("/")
                }
            })
    }, [])

    return <div>
        Loading...
    </div>
}