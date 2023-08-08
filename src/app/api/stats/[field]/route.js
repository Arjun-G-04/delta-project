import connectMongoDB from "@/libs/mongodb"
import Hostel from "@/models/Hostel"
import Student from "@/models/Student"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const { field } = params

    if (field === "hostels") {
        await connectMongoDB()
        const count = await Hostel.countDocuments()
        return NextResponse.json({count: count})
    } else if (field === "registered") {
        await connectMongoDB()
        const count = await Student.countDocuments()
        return NextResponse.json({count: count})
    } 
    else {
        return NextResponse.json({count: "null"})
    }
}