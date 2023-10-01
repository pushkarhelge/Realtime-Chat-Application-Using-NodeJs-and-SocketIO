// Node Srever which will handle socekt.io connections

// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const host = process.env.HOST || 'localhost';
// const port = process.env.PORT || 3000;
// const path = require('path')

// const io = require('socket.io')(3000);

// const users = {};

// io.on("connection", (socket)=>{
//     socket.on("new-user-joined", (name)=>{
//         console.log("New User joined as: ", name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send-msg', message=>{
//         socket.broadcast.emit('receive',{message: message, name: user[socket.id]})
//     })
// })




const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 80;

// const ipAddress = '192.168.1.10';

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "img-src 'self'");
    return next();
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  // Prompt the user for their name when they join
  socket.on('user join', (username) => {
    socket.username = username;
    io.emit('user join', `${username} has joined the chat.`);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      username: socket.username,
      message: msg,
    });
  });
});

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});
