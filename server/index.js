const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AuthRoutes = require('./routes/auth');
const MessageRoutes = require('./routes/messageroutes');


const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());


// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api', MessageRoutes);




mongoose.connect('mongodb+srv://kajalg1401:Kajalg1401@cluster0.s2pihga.mongodb.net/chat')
.then(() => {
    console.log("mongoose Connected");
}).catch((error) => {
    console.error("mongoose error:", error);
});


const server = app.listen(5000, () => {
    console.log('Server running on port 5000');
});
require('./websocket')(server);

