import { Iuser } from './../interfaces/user.interface';
import { model, Schema } from "mongoose";

const userSchema = new Schema<Iuser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'min character at least 3, got {VALUE}'],
            maxlength: 10
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type : Number,
            required : true,
            min: [18, "must be at least 18, got {VALUE}"],
            max : 60
        },
        email: {
            type: String,
            unique :[true, 'duplicate email not allow'],
            required: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            uppercase : true,
            enum: {
                values : ['USER', 'ADMIN'],
                message: "role is not valid, got {VALUE}"
            },
            default: 'USER'
        },

    }
)

export const User = model('User', userSchema)