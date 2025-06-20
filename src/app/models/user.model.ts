import { IAddress, Iuser } from './../interfaces/user.interface';
import { model, Schema } from "mongoose";
import validator from 'validator';

//created sub-schema for every data, which is nested in obj --> {key : type},
//  imported them from interface.ts
const addressSchema = new Schema<IAddress>({
    city: {
        type: String,
        required: [true, 'city is invalid']
    },
    street: String,
    zip: Number,
}, {
    _id: false // forbidden for extra or 2nd _id creation
})

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
            type: Number,
            required: true,
            min: [18, "must be at least 18, got {VALUE}"],
            max: 60
        },
        email: {
            type: String,
            unique: [true, 'duplicate email not allow'],

            // validate: {
            //     validator:
            //         function (value: string) {
            //             return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
            //         },
            //     message: function (props) {
            //         return `${props.value} is a invalid Email`
            //     }
            // },
            validate: [validator.isEmail],
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
            uppercase: true,
            enum: {
                values: ['USER', 'ADMIN'],
                message: "role is not valid, got {VALUE}"
            },
            default: 'USER'
        },

        //schema used as schemaType for proper type validation
        address: {
            type: addressSchema
        }
    }, {
    versionKey: false,
    timestamps: true
}
)

export const User = model('User', userSchema)