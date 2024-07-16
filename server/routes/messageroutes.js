// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Endpoint to get all messages
router.get('/messages', (req, res) => {
    Message.find()
        .sort({ timestamp: 1 }) // Sort messages by timestamp
        .then((messages) => {
            res.json(messages);
        })
        .catch((error) => {
            console.error('Error retrieving messages:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;
