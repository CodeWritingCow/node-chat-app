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
    
    socket.emit('newEmail', {
        from: 'MooMoo@cowmail.com',
        text: 'Moo!',
        createdAt: 123
    });
    
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
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