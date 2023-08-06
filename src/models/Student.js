import mongoose, { Schema } from "mongoose"
import { stringify } from "postcss"

const studentSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        rollno: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        gender: {
            type: String,
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

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema) 

export default Student