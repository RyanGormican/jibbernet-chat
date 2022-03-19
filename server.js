const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const db = require('./db');
const formatMessage = require('./utils/messageObject');
const {userJoinsRoom, getCurrentUser, userLeavesRoom, getRoomUsers} = require('./utils/userHelperFunctions');

const app = express();
const server = http.createServer(app);
const io = socketio(server); 

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects
io.on('connection', socket => {
    console.log('New web socket connection.');

    socket.on('joinRoom', ({username, room}) => {
        const user = userJoinsRoom(socket.id, username, room);
        socket.join(user.room);

        // welcomes current user
        socket.emit('message', formatMessage("Server message: ", 'Welcome to the chat!'));

        // broadcast when a user connects
        // broadcast emits to every client except the one who has connected
        socket.broadcast.to(user.room).emit('message', formatMessage("Server message: ", `${user.username} has joined the chat.`));

        // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        }); 
    });   

   // listen for chat message
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
    // run when client disconnects
    socket.on('disconnect', () => {
        const user = userLeavesRoom(socket.id);
        
        if(user) {
            io.to(user.room).emit('message', formatMessage("Server message: ", `${user.username} has left the chat.`));

             // send users and room info 
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));