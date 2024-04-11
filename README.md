<h1 align="center">DevTalk Chat App Overview</h1>
This repository contains the source code for a real-time chat application named DevTalk. DevTalk allows users to engage in live chatting with online indicators, responsive design for various screens, and sound notifications for incoming messages.

<h2>Technologies Used</h2>
React (Frontend)<br>
Node.js<br>
Express<br>
MongoDB (Database)<br>
Socket.IO (WebSocket for real-time communication)<br>
HTML/CSS<br>
<br>

<h2>Features</h2>
User Authentication and Authorization: Secure user authentication process.<br>
Live Chatting: Real-time messaging capability using WebSocket.<br>
Online User Indication: Visual indicators for online/offline status of users.<br>
Responsive Design: Ensures usability across different devices and screen sizes.<br>
Sound Notification: Audible alerts for incoming messages.<br>


<p>Frontend (React App)</p>
The frontend of this project is built using React. Below is an overview of the key components and functionalities.

<h3>Components</h3>
Home.jsx: Main component handling user interactions, messaging, and user list.<br>
Third.jsx: Preloader component (not detailed here).<br>
Hooks<br>
useLogout: Hook for handling user logout.<br><br>
useMessages: Hook for fetching user messages.<br>
useUser: Hook for fetching user data.<br>
useSend: Hook for sending messages.<br>
Custom WebSocket hook (useListenMessage) for listening to new messages.<br>
Custom hook (useConversation) for managing conversation state.<br>


<h3>Features</h3>
User authentication using AuthContext.<br>
Fetching user data and messages using custom hooks (useUser, useMessages).<br>
Real-time message listening and sending using Socket.IO (SocketContext).<br>
Responsive design based on screen size (useEffect for handling screen resize).<br>
Backend (Node.js/Express Server)<br>
The backend is implemented using Node.js and Express, providing RESTful APIs and WebSocket functionality for the chat application.<br>

<h3>API Routes</h3>
/api/auth: User authentication routes.<br>
/api/message: Message-related routes.<br>
/api/users: User-related routes.<br>

<h3>WebSocket</h3>
Utilizes Socket.IO for real-time communication between clients and server.

<h3>Middleware</h3>
cors: Configured to allow requests from specific origins.<br>
express.json(): Middleware to parse incoming request bodies.<br>
cookie-parser: Middleware for parsing cookies.<br>


<h2>Server Deployment</h2>
The server is deployed and hosted on the specified domain.

[View Demo](https://devtalk-chat-app.onrender.com)

<h3>How to Run</h3>
Clone this repository.
Install dependencies for both frontend and backend (npm install).
Start the frontend and backend servers (npm start for both).
