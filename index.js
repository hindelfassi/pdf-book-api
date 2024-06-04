const express = require("express");
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Logger = require("./src/middleware/LoggerMiddleware");
const { notFound, errorHanlder } = require("./src/middleware/errorsMiddleware");
const cors = require("cors");
const bookPath = require("./src/routes/books"); // Import the book routes

// app init
dotenv.config();
const app = express();

const connectToDB = require("./src/database/config");

// Cors Policy
app.use(cors());
app.use(bodyParser.json());

// Connection to Database
connectToDB();

// Middlewares
app.use(express.json());
app.use(Logger);

const PORT = process.env.PORT || 8000;

// Routes
app.use("/api/v1/books", bookPath); // Mount the book routes

// Error Handler Middleware
app.use(notFound);
app.use(errorHanlder);

const httpsServer = https.createServer(
  {
    key: fs.readFileSync("/etc/letsencrypt/live/4rst.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/4rst.com/fullchain.pem"),
  },
  app
);

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});

// Server running
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} Mode and listening on port ${PORT}`
  );
});
