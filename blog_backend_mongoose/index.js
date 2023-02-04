import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'


const PORT = process.env.PORT
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// hier ist genung Platz für alle eure Routen
app.get('/', (req, res) => {
    res.status(200).send('Alles OKAY')
})



// dann werfen wir den Server mal an
app.listen(PORT, () => console.log('Server runs on Port:', PORT))