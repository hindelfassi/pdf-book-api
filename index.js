const express = require("express");
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Logger = require("./src/middleware/LoggerMiddleware");
const { notFound, errorHanlder } = require("./src/middleware/errorsMiddleware");
const cors = require("cors");

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
app.use(Logger);

const PORT = process.env.PORT || 8000;

// Define the book routes (example)
const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  res.send("Welcome to the book API!");
});

// ... more book routes here ...

app.use("/api/v1/books", bookRouter); // Mount the book routes

// Error Handler Middleware
app.use(notFound);
app.use(errorHanlder);

// HTTPS Server Configuration (using environment variables)
const privateKey = fs.readFileSync(process.env.HTTPS_PRIVATE_KEY);
const certificate = fs.readFileSync(process.env.HTTPS_CERTIFICATE);
const httpsServer = https.createServer(
  {
    key: privateKey,
    cert: certificate,
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
