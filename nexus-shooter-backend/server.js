const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { 
    cors: {
        origin: "*", // In production, change this to your frontend's URL
        methods: ["GET", "POST"]
    } 
});

// Middleware
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- In-Memory Game State ---
const matchmakingQueue = [];
const activeGames = {}; // e.g., { 'match-id-123': { players: {...}, state: {...} } }

// --- Socket.IO Logic ---
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Matchmaking
    socket.on('find-match', (userData) => {
        matchmakingQueue.push({ ...userData, socketId: socket.id });
        console.log(`Player ${userData.username} added to queue. Queue size: ${matchmakingQueue.length}`);

        if (matchmakingQueue.length >= 10) {
            const matchPlayers = matchmakingQueue.splice(0, 10);
            const matchId = `match-${Date.now()}`;
            activeGames[matchId] = { players: {}, state: 'lobby' };
            
            // Assign teams and notify players
            matchPlayers.forEach((player, index) => {
                const team = index < 5 ? 'red' : 'blue';
                player.team = team;
                activeGames[matchId].players[player.socketId] = { ...player, health: 100, score: 0 };
                io.to(player.socketId).emit('match-found', { matchId, team, players: activeGames[matchId].players });
                socket.join(matchId); // Add player to their game room
            });

            // After a delay, start the game
            setTimeout(() => {
                io.to(matchId).emit('game-start');
                activeGames[matchId].state = 'active';
            }, 5000);
        }
    });

    // In-game events
    socket.on('player-update', (data) => {
        const matchId = Object.keys(activeGames).find(id => activeGames[id].players[socket.id]);
        if (matchId && activeGames[matchId].state === 'active') {
            if (activeGames[matchId].players[socket.id]) {
                activeGames[matchId].players[socket.id].position = data.position;
                activeGames[matchId].players[socket.id].rotation = data.rotation;
            }
            socket.to(matchId).emit('player-update', { id: socket.id, ...data });
        }
    });

    socket.on('player-shoot', (data) => {
        const matchId = Object.keys(activeGames).find(id => activeGames[id].players[socket.id]);
        if (!matchId) return;

        // **AUTHORITATIVE LOGIC**: Server determines if the shot hits
        // For a hackathon, we can simulate a hit. In a real game, you'd do raycasting here.
        const targetId = findTarget(data, activeGames[matchId].players); // This function needs to be implemented
        if (targetId) {
            const damage = 25;
            activeGames[matchId].players[targetId].health -= damage;
            
            io.to(targetId).emit('player-shot', { damage, attackerId: socket.id, newHealth: activeGames[matchId].players[targetId].health });
            
            if (activeGames[matchId].players[targetId].health <= 0) {
                io.to(matchId).emit('player-eliminated', { victimId: targetId, attackerId: socket.id });
                // Handle respawn logic here
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        // Remove from queue and active games
        // ... implementation for cleanup
    });
});

// Placeholder for hit detection logic
function findTarget(shootData, players) {
    // TODO: Implement actual raycasting or hit detection logic here.
    // For now, this will always return null (no hit).
    return null;
}

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));