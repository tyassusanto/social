const User = require('../models/User')
const router = require('express').Router()
const userController = require('../controllers/users')


router.put('/:id', userController.updateUser) // update user
router.delete('/:id', userController.deleteUser) // delete user
router.get('/', userController.getUser) // get a user
router.get('/friends/:userId', userController.getFriends) // get fiends
router.put('/:id/follow', userController.followUser) // follow a user
router.put('/:id/unfollow', userController.unfollowUser) // unfollow a user

module.exports = router