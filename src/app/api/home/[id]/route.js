import connectMongoDB from "@/libs/mongodb"
import Auth from "@/models/Auth"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const {id} = params
    let output = {auth: false}

    try {
        await connectMongoDB()
        const auth = await Auth.findById(id)
        const res = await fetch("https://auth.delta.nitt.edu/api/resources/user", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`
            }
        })
        const resJSON = await res.json()

        if (resJSON.error) {
            await Auth.findByIdAndDelete(id)
        } else {
            output = {auth: true, details: resJSON}
        }
    } catch(error) {
        console.log(error)
    }

    return NextResponse.json(output)
}

export async function DELETE(req, {params}) {
    const {id} = params
    
    try {
        await connectMongoDB()
        await Auth.findByIdAndDelete(id)
    } catch(error) {
        console.log(error)
    }

    return NextResponse.json({status: "done"})
}