
import { ObjectId } from "mongodb"
import mongoose from "mongoose"
import Post from "../model/Post.js"
import User from "../model/User.js"
import { deleteImage } from "../services/cloudinary.js"
import { getDb } from "../util/db.js"
import { verifyToken } from "../util/token.js"

mongoose.set('bufferCommands', false)
const db = await getDb()

export const uploadNewPost = async (req, res) => {
    const token = req.cookies.token
    try {
        const result = verifyToken(token)
        console.log('tags', req.body.tags)
        const dbUser = await User.findOne({ _id: new ObjectId(result.userid) })
        console.log(dbUser)
        if (!dbUser) {
            console.log('dbUser not found')
            res.status(400).end()
        }
        const newPost = await Post.create({
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            tags: req.body.tags,
            createdAt: new Date(),
            updatedAt: new Date(),
            author: dbUser,
            image: req.body.image,
            tags: req.body.tags
        })
        await newPost.populate('author')
        console.log(newPost)
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400)
    }
}

export const getUserPosts = async (req, res) => {
    const token = req.cookies.token
    try {
        const result = verifyToken(token)
        const dbUser = await User.findOne({ _id: new ObjectId(result.userid) })
        const allPosts = await Post.find({ author: dbUser }).populate('author')
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(400).end()
    }

}

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find().populate('author')
        console.log(allPosts)
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(400).end()
    }
}

export const getSinglePost = async (req, res) => {
    const params = req.params.post
    try {
        const post = await Post.find({ _id: new ObjectId(params) }).populate('author')
        // console.log(post)
        res.status(200).json(post)
    } catch (error) {

    }
}

export const deletePost = async (req, res) => {
    console.log(req.body)
    await deleteImage(req.body.public_id)
    try {
        const result = await Post.deleteOne({ _id: new ObjectId(req.body.id) })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).end(error.message)
    }
}

export const editPost = async (req, res) => {
    const params = req.params.post
    try {
        if (req.body.old_id) {
            await deleteImage(req.body.old_id)
        }
        const update = await Post.updateOne({ _id: new ObjectId(params) }, { 
            title: req.body.title, 
            slug: req.body.slug, 
            content: req.body.content, 
            image: 
            { 
                url: req.body.url, 
                public_id: req.body.public_id 
            },
            updatedAt: new Date(),
            tags: req.body.tags })
        const updatedPost = await Post.find({ _id: new ObjectId(params) }).populate('author')
        console.log(updatedPost)
        res.status(200).json(update)
    } catch (error) {
        res.status(418).end(error.message)
    }
}

export const getTaggedPosts = async(req, res) => {
    const params = req.params.tag
    try {
        const posts = await Post.find().all('tags', [params]).populate('author')
        console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        console.log(error.messsage)
        res.status(400).end()
    }
}