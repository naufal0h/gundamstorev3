const userRoute = require('express').Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/auth')
const upload = require('../middlewares/multer')

userRoute.get('/', UserController.getAllUsers)
userRoute.post('/register', upload.single('avatar'), UserController.register)
userRoute.post('/login', UserController.login)
userRoute.put('/', authentication, upload.single('avatar'), UserController.update)
userRoute.get('/info', authentication, UserController.getUserById)

module.exports = userRoute