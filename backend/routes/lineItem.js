const lineItemRoute = require('express').Router()
const LineItemController = require('../controllers/LineItemController')

lineItemRoute.get('/', LineItemController.getAllLineItems)
// lineItemRoute.get('/', LineItemController.getLineItemsByUserId)

module.exports = lineItemRoute