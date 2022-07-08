const jwt = require('jsonwebtoken')
const secretCode = process.env.SECRET_CODE || 'twentyfour'

const tokenGenerator = (data) => {
    const {id, username, email, birthday, gender, salt, avatar, type} = data
    return jwt.sign({
        id, username, email, birthday, gender, salt, avatar, type
    }, secretCode)
}

const tokenVerifier = (data) => {
    return jwt.verify(data, secretCode)
}

module.exports= {
    tokenGenerator, tokenVerifier
}