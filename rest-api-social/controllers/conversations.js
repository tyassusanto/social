const Conversation = require('../models/Conversation')

// NEW CONVERSATION

const newConv = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(500).json('error post conversation', err)
    }
}

// GET ALL CONVERSATION A USER
const getAllUserConv = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json('error get conversation', err)
    }
}

// GET CONVERSATION BETWEEN
const getConv = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.fistUserId, req.params.secondUserId] }
        })
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    newConv,
    getAllUserConv,
    getConv
}