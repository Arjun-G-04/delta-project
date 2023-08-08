import connectMongoDB from "@/libs/mongodb"
import Hostel from "@/models/Hostel"
import { NextResponse } from "next/server"

export async function POST(req) {
    const data = await req.json()
    try {
        await connectMongoDB()
        await Hostel.create(data)
        return NextResponse.json({msg: "done"}, {status: 200})
    } catch(error) {
        return NextResponse.json({msg: error}, {status: 500})
    }
}

export async function GET(req) {
    await connectMongoDB()
    const hostels = await Hostel.find()
    return NextResponse.json({hostels: hostels})
}