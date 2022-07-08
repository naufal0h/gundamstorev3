const { User, Order, ShoppingCart } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator, tokenVerifier } = require('../helpers/jsonwebtoken')

class UserController {
    static async getAllUsers(req, res, next) {
        try {
            let users = await User.findAll({
                // include : [ Order, ShoppingCart]
            })
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const avatar = req.file.filename
            const { username, email, password, birthday, gender, type } = req.body
            let result = await User.create({
                username, email, password, birthday, gender, avatar, type
            })
            await ShoppingCart.create({
                UserId: result.id,
                status: "open"
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            let emailFound = await User.findOne({
                where: { email }
            })
            if (emailFound) {
                if (decryptPwd(password, emailFound.password)) {
                    let access_token = tokenGenerator(emailFound)
                    res.status(200).json({
                        access_token,
                        type: emailFound.type,
                        avatar: emailFound.avatar,
                    })
                } else {
                    res.status(403).json({
                        message: "Invalid password"
                    })
                }
            } else {
                res.status(404).json({
                    message: `User not found`
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async update(req, res, next) {
        try {
            const id = +req.userData.id;
            const { username, email, password, birthday, gender, avatar, type } = req.body
            const image = req.file? req.file.filename : avatar;

            let result = await User.update({
                username, email, password, birthday, gender, 
                avatar:image, 
                type,
            },
                {
                    where: { id },
                    individualHooks: true
                })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async getUserById(req, res, next) {
        try {
            const id = +req.userData.id
            let result = await User.findOne({
                where: { id },
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController