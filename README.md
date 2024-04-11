<h1>DevTalk Chat App Overview</h1>
This repository contains the source code for a real-time chat application named DevTalk. DevTalk allows users to engage in live chatting with online indicators, responsive design for various screens, and sound notifications for incoming messages.

<h2>Technologies Used</h2>
React (Frontend)
Node.js
Express
MongoDB (Database)
Socket.IO (WebSocket for real-time communication)
HTML/CSS


<h2>Features</h2>
User Authentication and Authorization: Secure user authentication process.
Live Chatting: Real-time messaging capability using WebSocket.
Online User Indication: Visual indicators for online/offline status of users.
Responsive Design: Ensures usability across different devices and screen sizes.
Sound Notification: Audible alerts for incoming messages.
Frontend (React App)
The frontend of this project is built using React. Below is an overview of the key components and functionalities.

<h3>Components</h3>
Home.jsx: Main component handling user interactions, messaging, and user list.
Third.jsx: Preloader component (not detailed here).
Hooks
useLogout: Hook for handling user logout.
useMessages: Hook for fetching user messages.
useUser: Hook for fetching user data.
useSend: Hook for sending messages.
Custom WebSocket hook (useListenMessage) for listening to new messages.
Custom hook (useConversation) for managing conversation state.


<h3>Features</h3>
User authentication using AuthContext.
Fetching user data and messages using custom hooks (useUser, useMessages).
Real-time message listening and sending using Socket.IO (SocketContext).
Responsive design based on screen size (useEffect for handling screen resize).
Backend (Node.js/Express Server)
The backend is implemented using Node.js and Express, providing RESTful APIs and WebSocket functionality for the chat application.

<h3>API Routes</h3>
/api/auth: User authentication routes.
/api/message: Message-related routes.
/api/users: User-related routes.

<h3>WebSocket</h3>
Utilizes Socket.IO for real-time communication between clients and server.

<h3>Middleware</h3>
cors: Configured to allow requests from specific origins.
express.json(): Middleware to parse incoming request bodies.
cookie-parser: Middleware for parsing cookies.


<h2>Server Deployment</h2>
The server is deployed and hosted on the specified domain.

<p>Live Demo</p>
<a>View Live Demo</a>

<h3>How to Run</h3>
Clone this repository.
Install dependencies for both frontend and backend (npm install).
Start the frontend and backend servers (npm start for both).
