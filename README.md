Overview:

This is the backend of a polling application that allows users to create polls, vote on them, and view real-time results. The backend is built using Node.js, Express, MongoDB, and WebSocket (Socket.IO) for real-time updates.

Features:

Create Polls: Allows authenticated users to create polls with multiple options.
Vote on Polls: Users can vote on polls, and results update in real-time.
View Poll Results: Displays poll results based on the highest votes.
Real-time Updates: Leveraging WebSocket (Socket.IO) to provide real-time voting updates.

Technologies Used:

Node.js: Server-side JavaScript runtime.
Express: Web framework for Node.js.
MongoDB: NoSQL database for storing poll data.
Socket.IO: Enables real-time bidirectional event-based communication.

Clone the repository:

git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

Install dependencies:
npm install

Set up environment variables:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Start the server:
npm start

Polls
GET Req /api/polls: Get all polls.
POST Req /api/polls: Create a new poll.

Get a single poll by ID.
POST /api/polls/
/vote: Vote on a poll.

WebSocket (Socket.IO)
/v0te polls/
