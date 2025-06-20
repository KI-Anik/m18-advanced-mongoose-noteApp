"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
//created sub-schema for every data, which is nested in obj --> {key : type},
//  imported them from interface.ts
const addressSchema = new mongoose_1.Schema({
    city: {
        type: String,
        required: [true, 'city is invalid']
    },
    street: String,
    zip: Number,
}, {
    _id: false // forbidden for extra or 2nd _id creation
});
const userSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail],
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
});
exports.User = (0, mongoose_1.model)('User', userSchema);
