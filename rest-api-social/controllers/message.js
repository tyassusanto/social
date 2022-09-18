const Message = require('../models/Message')

// POST MESSAGE
const message = async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(500).json('error post message', err)
    }
}

// GET MESSAGE 
const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json('error get message', err)        
    }
}

module.exports = {
    message,
    getMessage
}