const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const AuthRoutes = require('./routes/auth');
const MessageRoutes = require('./routes/messageroutes');
 require('dotenv').config()
 const webSocket = require('./websocket');

const app = express();
const mongoUrL = process.env.MONGO_URL
app.use(cors());
app.options('*', cors());
app.use(express.json());
const servercreated = http.createServer(app);

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api', MessageRoutes);


//  Deployment
const path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'register.html'));
});


mongoose.connect(mongoUrL)
.then(() => {
    console.log("mongoose Connected");
}).catch((error) => {
    console.error("mongoose error:", error);
});

webSocket(servercreated)
const server = app.listen(5000, () => {
    console.log('Server running on port 5000');
});
require('./websocket')(server);

