import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req, res) => {
    res.send('Hello world');
});
io.on('connection', (socket) => {
    console.log('Client connected via WebSocket');
    // Handle Twilio Media Streams data
    socket.on('message', (data) => {
        console.log('Audio Stream Data:', data);
        // Process or analyze the audio packets here
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(3000, () => {
    console.log('Socket.IO server listening on ws://localhost:3000');
});
