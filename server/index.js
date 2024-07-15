const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AuthRoutes = require('./routes/auth');
const MessageRoutes = require('./routes/messageroutes');
 require('dotenv').config()

const app = express();
const mongoUri = process.env.MONGO_URI
app.use(cors());
app.options('*', cors());
app.use(express.json());


// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api', MessageRoutes);


//  Deployment
const path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


mongoose.connect(mongoUri)
.then(() => {
    console.log("mongoose Connected");
}).catch((error) => {
    console.error("mongoose error:", error);
});


const server = app.listen(5000, () => {
    console.log('Server running on port 5000');
});
require('./websocket')(server);

