# Nexus Shooter - Backend

A scalable and robust Node.js backend for a 5v5, real-time multiplayer shooter game, developed as a hackathon project. This project demonstrates the implementation of an authoritative game server, real-time state synchronization, and a matchmaking system.

## 🎯 Project Overview

The "Nexus" backend is designed to be the "source of truth" for a fast-paced multiplayer game. It handles all core game logic, including player movement, shooting, damage calculation, and matchmaking, to ensure a fair and cheat-free experience for all players.

## ✨ Key Features

- **Authoritative Server:** All game logic is managed server-side to prevent client-side cheating.
- **Real-Time Communication:** Uses Socket.IO for low-latency, bidirectional communication between the server and clients.
- **Matchmaking System:** A queue-based system that automatically groups 10 players into two teams of five.
- **RESTful API:** Secure endpoints for user authentication and profile management using JWT.
- **Data Persistence:** Stores user profiles and statistics in MongoDB, while active game state is managed in-memory for performance.

## 🛠 Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-Time Engine:** Socket.IO
- **Database:** MongoDB (Persistent) / In-Memory Store (Active Games)
- **Authentication:** JSON Web Tokens (JWT)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed
- A MongoDB database (either local or cloud-based like MongoDB Atlas)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/nexus-shooter-backend.git
    cd nexus-shooter-backend
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    PORT=5000
    ```
4.  Start the server:
    ```bash
    npm start
    ```
    For development with auto-restart:
    ```bash
    npm run dev
    ```

The server will now be running on `http://localhost:5000`.

## 📖 API Documentation

### REST API Endpoints

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Authenticate a user and receive a JWT.

### WebSocket Events

- **Client -> Server:**
  - `find-match`: Enter the matchmaking queue.
  - `player-update`: Send player state (position, rotation).
  - `player-shoot`: Fire a weapon.

- **Server -> Client:**
  - `match-found`: A match has been found.
  - `game-start`: The game has begun.
  - `game-state-update`: Periodic update of all players' states.
  - `player-shot`: Notification of being hit.

## 📄 Project hidden sequence:
The (.) files are hidden the repository and even if someone implements it in the system it remain hidden because they are concidered as system level files; <.gitignore>,<.env> . If incase of modification neessity you must view using <nano > or any other <code editors> ...........


## 🤝 Contributing

This was a hackathon project, but contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the MIT License.
