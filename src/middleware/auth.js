const jwt = require('jsonwebtoken')
const User = require('../model/user')
const path = require('path')

const auth = async (req, res, next) => {
    try {
        console.log("auth start");
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        //res.status(401).sendFile(path.join(__dirname, "../../public/login.html"))
        res.status(401).send({ error: 'Please authenticate.' })
        console.log("auth error");
    }
}

module.exports = auth