# Nexus Shooter - Backend

## Key Features

- **Authoritative Server** 
- **Real-Time Communication** 
- **Matchmaking System** 
- **RESTful API** 
- **Data Persistence** 

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-Time Engine:** Socket.IO
- **Database:** MongoDB (Persistent) / In-Memory Store (Active Games)
- **Authentication:** JSON Web Tokens (JWT)

### Prerequisites

- Node.js and npm installed
- A MongoDB database .

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Joyboy9801/Real-time-Multiplayer-Game-s-Backend-/nexus-shooter-backend.git
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

## API Documentation

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

##  Project hidden sequence:
The (.) files are hidden the repository and even if someone implements it in the system it remain hidden because they are concidered as system level files; <.gitignore>,<.env> . If incase of modification neessity you must view using " nano " or any other " code-editors " .

## License

This project is licensed under the MIT License.
