const route = require('express').Router()

route.get('/', (req, res) => {
    res.status(200).json({
        message: "Organify"
    })
})

const userRoutes = require('./user')
const postingRoutes = require('./product')
const orderRoutes = require('./order')
const shoppingCartRoutes = require('./shoppingCart')
const lineItemRoutes = require('./lineItem')

route.use('/users', userRoutes)
route.use('/products', postingRoutes)
route.use('/orders', orderRoutes)
route.use('/carts', shoppingCartRoutes)
route.use('/lines', lineItemRoutes)

module.exports = route