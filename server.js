const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A player connected:', socket.id);
    socket.on('playerMoved', (data) => {
        socket.broadcast.emit('playerMoved', { id: socket.id, ...data });
    });
    socket.on('disconnect', () => {
        io.io?.emit('playerDisconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
