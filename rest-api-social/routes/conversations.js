const router = require('express').Router()
const conversationController = require('../controllers/conversations')

router.post('/', conversationController.newConv) // NEW CONVERSATION
router.get('/:userId', conversationController.getAllUserConv) // GET CONVERSATION OF A USER
router.get('/find/:fistUserId/:secondUserId', conversationController.getConv) // GET CONVERSATION INCLUDES TWO userId

module.exports = router