const socket = io('http://localhost:3000');

const form = document.getElementById('msg-send');
const messageInput = document.getElementById('messageInp');

// where to append new msg
const msgContainer = document.querySelector('.container')


// take user name input first
const uname = prompt("Enter your name to join");

socket.emit('new-user-joined', uname)
