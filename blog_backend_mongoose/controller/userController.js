import { getDb } from "../util/db.js"
import { createToken, verifyToken } from "../util/token.js"
import User from "../model/User.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const COL = 'users'
const cookieConfig = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/api'
}

mongoose.set('bufferCommands', false)
const db = await getDb()

export const login = async (req, res) => {
    const user = req.body
    try {
        const dbUser = await User.findOne({ email: user.email })
        if (dbUser === null || dbUser.pass !== user.pass) {
            console.log('user not found')
            res.status(401).end()
        }
        else {
            const token = createToken(dbUser)
            res.cookie('token', token, cookieConfig)
            res.status(200).json({ token })
        }
    } catch (error) {
        console.error(error)
        res.status(500).end()
    }
}

export const register = async (req, res) => {
    try {
        const dbUser = await User.exists({ email: req.body.email })
        if (dbUser !== null) {
            console.log('error: user already exists')
            res.status(409).end()
        }
        else {
            try {
                const newUser = await User.create({
                    first: req.body.first,
                    last: req.body.last,
                    email: req.body.email,
                    pass: req.body.pass,
                    registeredAt: new Date()
                })
                console.log(newUser)
                res.status(200).end()
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    catch (err) {
        console.log(err.message)
        res.status(403).end()
    }
}

export const userCheck = async (req, res) => {
    const token = req.cookies.token
    try {
        const result = verifyToken(token)
        const dbUser = await User.findOne({ _id: new ObjectId(result.userid) }, { first: 1 })
        res.status(200).json(dbUser)
    }
    catch (err) {
        console.log(err.message)
        res.status(401).end()
    }

}

export const logout = (req, res) => {
    res.cookie('token', '', { ...cookieConfig, maxAge: 0 })
    res.status(204).end();
}