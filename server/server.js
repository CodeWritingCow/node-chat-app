const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('newMessage', {
        from: 'Moo Moo',
        text: 'Moo!',
        createdAt: 123123
    });
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

app.get('/', (req, res) => {
   res.render('index.html');
});

server.listen(port, process.env.IP, () => {
    console.log(`Server is up on port ${port}!`);
});