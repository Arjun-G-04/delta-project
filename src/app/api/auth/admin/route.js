import { NextResponse } from "next/server"
import app from "@/libs/firebase"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

export async function POST(req) {
    const data = await req.json()
    const auth = getAuth()

    try {
        const userCrecential = await signInWithEmailAndPassword(auth, data.email, data.password)
        const user = userCrecential.user
        return NextResponse.json({auth: true})
    } catch (error) {
        console.log(error.code)
        return NextResponse.json({auth: false})
    }
}

export async function DELETE(req) {
    const auth = getAuth()
    try {
        await signOut(auth)
        return NextResponse.json({status: "nothing"})
    } catch(error) {
        console.log(error)
        return NextResponse.json({status: "error"})
    }
}

export async function GET(req) {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
        return NextResponse.json({auth: true})
    } else {
        return NextResponse.json({auth: false})
    }
}