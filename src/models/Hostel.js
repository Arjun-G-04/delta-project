import mongoose, { Schema } from "mongoose"

const hostelSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        roomSize: {
            type: Number,
            required: true
        },
        roomsNo: {
            type: Number,
            required: true
        },
        year: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Hostel = mongoose.models.Hostel || mongoose.model("Hostel", hostelSchema) 

export default Hostel