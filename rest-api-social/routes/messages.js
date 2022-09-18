const router = require('express').Router()
const messageController = require('../controllers/message')

router.post('/',messageController.message) // POST MESSAGE
router.get('/:conversationId', messageController.getMessage) // GET MESSAGE

module.exports = router