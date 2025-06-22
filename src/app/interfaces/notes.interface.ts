import { Types } from "mongoose"

export interface Inotes {
    title : String,
    content : String,
    category : 'personal' | "work" | "study" | "other",
    pinned : Boolean,
    tags: {
        label : String,
        color : String
    },
    userByRef : Types.ObjectId
}