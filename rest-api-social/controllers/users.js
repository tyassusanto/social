const User = require('../models/User')
const bcrypt = require('bcrypt')

// UPDATE USER
const updateUser = async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body,
            })
            res.status(200).json('account has been updated')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('you can only update your account')
    }
}

// DELETE USER
const deleteUser = async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json('account has been deleted')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('you can only delete your account')
    }
}

// GET A USER
const getUser = async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username:username})
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
}

// GET FRIEND
const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = []
        friends.map(friend => {
            const { _id, username, profilePic } = friend
            friendList.push({ _id, username, profilePic })
        })
        res.status(200).json(friendList)
    } catch (err) {
        res.status(500).json(err)
    }
}

// FOLLOW A USER 
const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json('user has been followed')
            } else {
                res.status(403).json('you already follow this user')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('you cant follow yourself')
    }
}

// UN FOLLOW USER
const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId} })
                await currentUser.updateOne({$pull: {followings: req.params.id  } })
                res.status(200).json('user has been unfollowed')
            } else {
                res.status(403).json('you dont follow this user')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('you cant unfollow yourself')
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getFriends,
    followUser,
    unfollowUser
}