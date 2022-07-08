const shoppingCartRoute = require('express').Router()
const ShoppingCartController = require('../controllers/ShoppingCartController')
const authentication = require('../middlewares/auth')

shoppingCartRoute.get('/all', ShoppingCartController.getAllShoppingCarts)
shoppingCartRoute.get('/', authentication, ShoppingCartController.getCartByUserId)
shoppingCartRoute.post('/add', authentication, ShoppingCartController.addToCart)
shoppingCartRoute.put('/edit/:id', authentication, ShoppingCartController.editLineItem)
shoppingCartRoute.delete('/delete/:id', authentication, ShoppingCartController.deleteLineItem)
shoppingCartRoute.post('/checkout', authentication, ShoppingCartController.checkout)


module.exports = shoppingCartRoute