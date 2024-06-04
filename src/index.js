const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Logger = require("./middleware/LoggerMiddleware");
const { notFound, errorHanlder } = require("./middleware/errorsMiddleware");
const cors = require("cors");
const bookPath = require("./routes/books"); // Import the book routes

// app init
dotenv.config();
const app = express();

const connectToDB = require("./database/config");

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

// Server running
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} Mode and listening on port ${PORT}`
  );
});
