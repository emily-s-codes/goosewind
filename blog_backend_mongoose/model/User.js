import mongoose from "mongoose";

const { Schema, model } = mongoose

const userSchema = new Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minLength: 8,
        required: true,
        lowercase: true,
    },
    pass: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

const User = model('User', userSchema)
export default User