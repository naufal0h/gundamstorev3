const productRoute = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/auth')
const upload = require('../middlewares/multer')

productRoute.get('/', ProductController.getAllProducts)
productRoute.post('/', authentication, upload.array("filename"), ProductController.create) //just for admin
productRoute.put('/:id', ProductController.update) //just for admin
productRoute.get('/:id', ProductController.getProductById)
productRoute.put('/views/:id', ProductController.addViews);

module.exports = productRoute