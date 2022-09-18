const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    // filename: (req, file, cb) => {
    //     // const randomName = Math.floor(Math.random() * 1000)
    //     cb(null, req.body.name) //MASALAH DI UPLOAD FILE NAME 
    //     // console.log('random name poto', randomName)
    // }            //req.body.name    //SAAT POST DARI APLIKASI
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

// const upload = multer({storage})
// app.post('/api/upload', upload.single('file'), (req, res) => {
//     try {
//         return res.status(200).json('Success upload a file')
//     } catch (err) {
//         console.log('err multer',err)
//     }
// })

const upload = multer({storage:storage})

module.exports = upload