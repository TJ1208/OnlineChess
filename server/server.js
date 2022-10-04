const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {    
    // sock.emit('message', 'You are connected');
    sock.on('movePiece', (e) => io.emit('movePiece', e));
});

server.on('error', () => {
    console.error(err);
})

server.listen(8080, () => {
    console.log("server is ready");
})