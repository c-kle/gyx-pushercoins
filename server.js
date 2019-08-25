const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS middleware
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

// Set port to be used by Node.js
app.set('port', (4001))

app.get('/', (req, res) => {
  res.send('Welcome')
})

// app.listen(app.get('port'), () => {
//   console.log('Node app is running on port', app.get('port'))
// })


const server = http.createServer(app);
const io = socketIo(server);

const getApiAndEmit = socket => {
  axios.get(
    'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD'
  ).then(response => {
    socket.emit('coin-Price', response.data);
  });
};

let interval;

io.on('connection', socket => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));