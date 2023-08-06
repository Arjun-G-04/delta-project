import connectMongoDB from "@/libs/mongodb"
import Auth from "@/models/Auth"
import Student from "@/models/Student"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const {id} = params

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
            const user = await Student.findOne({ rollno: resJSON.email.slice(0, 9)})

            if (user === null) {
                return NextResponse.json({auth: true, created: false, details: resJSON})
            } else {
                return NextResponse.json({auth: true, created: true, userDetails: user})
            }
        }
    } catch(error) {
        console.log(error)
        return NextResponse.json({auth: false})
    }
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