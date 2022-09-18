const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// REGISTER

const registerUser = async (req, res) => {
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        // save user and return response
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        console.log('err register', err)
    }
}

// LOGIN
const loginUser = async (req, res) => {
    try {      
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json('user is not found')

        const userPassword = await bcrypt.compare(req.body.password, user.password)
        !userPassword && res.status(400).json('wrong password')
        
        const payload = {
            _id:user._id,
            email: user.email,
            username: user.username,
            profilePic: user.profilePic,
            coverPic: user.coverPic,
            desc: user.desc,
            isAdmin: user.isAdmin,
            followers: user.followers,
            followings: user.followings
        }
        const secretKey = process.env.SECRET_KEY_JWT
        const expToken = {expiresIn: '1 days'}
        const token = jwt.sign(payload, secretKey, expToken)
        
        // console.log('token', token)
        res.status(200).json({payload, token})
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    registerUser,
    loginUser
}