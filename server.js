// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/Tasks", taskRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));