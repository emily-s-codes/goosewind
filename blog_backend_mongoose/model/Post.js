import mongoose from "mongoose";
import User from "./User.js";

const { Schema, model } = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        minLength: 8,
        required: true
    },
    tags: [{
        type: String
    }],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User,
        required: true
    },
    image: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }
},

    { timestamps: true }
)

// postSchema.pre('save', function (next) {
//     this.updatedAt = Date.now()
//     next()
// })

const Post = model('Post', postSchema)
export default Post