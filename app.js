const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const pollRoutes = require('./routes/pollRoute');
// const authRoutes = require('./routes/authRoute');
const Poll = require('./models/pollModel');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

//websocket init
app.set('io', io);

app.use('/', pollRoutes);
// app.use('/auth', authRoutes);


mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

//socket.io config
io.on('connection', (socket) => {
  console.log('New WebSocket connection', socket.id);

  socket.on('join poll', (pollId) => {
    console.log(`Socket ${socket.id} joined poll ${pollId}`);
    socket.join(pollId);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected', socket.id);
  });
});

// middleware for error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});