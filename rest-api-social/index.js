const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const multer = require('multer')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const conversationRoute = require('./routes/conversations')
const messageRoute = require('./routes/messages')


dotenv.config()
app.use(cors({origin: true}))

// database connection
mongoose.connect(
    process.env.MONGO_URL,
    {},
     () => {
    console.log('connected to database');
    }
);

app.use('/images', express.static(path.join(__dirname, 'public/images')))

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// MULTER

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        // cb(null, req.body.filename)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
        // // console.log('filename: ', file.filename)
    }
})

const upload = multer({storage})
app.post('/api/upload', upload.single('img'), (req, res) => {
    try {
        return res.status(200).json('Success Upload')
    } catch (err) {
        console.log(err, 'err Multer')
    }
})

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/conversations', conversationRoute)
app.use('/api/messages', messageRoute)

app.listen(8800, ()=> {
    console.log('Backend Ready');
})