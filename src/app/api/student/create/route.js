import Student from "@/models/Student"
import connectMongoDB from "@/libs/mongodb"
import { NextResponse } from "next/server"

export async function POST(req) {
    const details = await req.json()

    await connectMongoDB()

    try {
        const student = await Student.create(details)
        return NextResponse.json({status: "done"})
    } catch(error) {
        console.log(error)
        return NextResponse.json({status: "failed"})
    }
}