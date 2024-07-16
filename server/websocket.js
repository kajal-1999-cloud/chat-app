const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const Message = require('./models/message'); 

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        console.log('Client connected to WebSocket');

        ws.on('message', (message) => {
            try {
                const parsedMessage = JSON.parse(message);
                console.log('Received message:', parsedMessage);

                const { token, text } = parsedMessage;
                if (!token) return;

                jwt.verify(token, 'secretkey', (err, decoded) => {
                    if (err) return;

                    const { user } = decoded;
                    const newMessage = new Message({ username: user, text });

                    // Save message to the database
                    newMessage.save()
                        .then(() => {
                            console.log('Message saved:', newMessage);
                            wss.clients.forEach(client => {
                                if (client.readyState === WebSocket.OPEN) {
                                    client.send(JSON.stringify({ username: user, text }));
                                }
                            });
                        })
                        .catch(error => {
                            console.error('Error saving message:', error);
                        });
                });
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected from WebSocket');
        });
    });
};
