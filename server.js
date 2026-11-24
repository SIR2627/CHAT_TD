const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/ola', (req, res) => {
  res.send('Olá, mundo!');
});
let cidx = 0;
const colors = ['red', 'green', 'blue', 'brown', 'purple'];

io.on('connection', (socket) => {
  socket.color = colors[cidx % colors.length];
  cidx++;
  console.log('a user connected with socket id:', socket.id);
  socket.on('mensagem', (msg) => {
    console.log('mensagem recebida:', msg);
    io.emit('msgpost', {color: socket.color, msg: msg});
  });
});



server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});