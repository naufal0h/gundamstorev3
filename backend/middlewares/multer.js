const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../backend/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})


// app.post('/multi', upload.array('images'), (req, res) => {
//     console.log(req.files)
//     res.send("success")
// })

module.exports = upload