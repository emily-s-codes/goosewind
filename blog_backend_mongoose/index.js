import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { login, logout, register, userCheck } from './controller/userController.js'
import { encrypt } from './middleware/encrypt.js'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import { deletePost, editPost, getAllPosts, getSinglePost, getTaggedPosts, getUserPosts, uploadNewPost } from './controller/postController.js'

const PORT = process.env.PORT
const app = express()

const formReader = multer()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// See that server is running
app.get('/', (req, res) => {
    res.status(200).send('Alles OKAY')
})

// User-Related 
app.post('/api/login', formReader.none(), encrypt, login)
app.post('/api/register', formReader.none(), encrypt, register)
app.get('/api/user', formReader.none(), userCheck)
app.get('/api/logout', logout)

// Collection of Posts
app.get('/api/posts', getUserPosts)
app.get('/api/allposts', getAllPosts)
app.get('/api/posts/:tag', getTaggedPosts)

// Single Post
app.post('/api/post', formReader.none(), uploadNewPost)
app.delete('/api/post', deletePost)
app.put('/api/blog/:post', editPost)
app.get('/api/blog/:post', getSinglePost)


app.listen(PORT, () => console.log('Server runs on Port:', PORT))