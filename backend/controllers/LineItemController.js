const { LineItem } = require('../models')

class LineItemController{
    static async getAllLineItems (req, res, next){
        try{
            let products = await LineItem.findAll({
            })
            res.status(200).json(products)
        } catch(err){
            next(err)
        }
    }
}
module.exports = LineItemController