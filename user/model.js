import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const userSchema = ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tc: {
        type: Boolean,
        required: true
    }
})

const user = model("users", userSchema)
export default user