import { NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Auth from "@/models/Auth"

export async function GET(req, { params }) {
    const baseURL = process.env.BASE_URL
    const { code } = params
    let output = {auth: false}
    
    const data = {
        client_id: process.env.NODE_ENV === 'production' ? 'aohOCpCGUUxlBn1C' : 'NAIRt7G6lbmLLFpN', 
        client_secret: process.env.NODE_ENV === 'production' ? 'lvcwMui8HfBtxIShXknxcIMrWH6MZJgo' : 'zOhZ85bIyKmr4XDQv5vKsRsKZOjGkhtc', 
        grant_type: 'authorization_code', 
        code: code, 
        redirect_uri: process.env.NODE_ENV === 'production' ? baseURL+"/callback" : 'http://localhost:3000/callback'}

    const formData = new URLSearchParams();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    const res = await fetch(`https://auth.delta.nitt.edu/api/oauth/token`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: formData
    })
    const resJSON = await res.json()

    if (resJSON.access_token) {
        try {
            await connectMongoDB()
            const auth = await Auth.create({accessToken: resJSON.access_token, idToken: resJSON.id_token})
            output = {auth: true, id: auth.id}
        } catch(error) {
            console.log(error)
        }
    }

    return NextResponse.json(output)
}