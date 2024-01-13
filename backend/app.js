const express = require("express");
const http = require("http")
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
// Database MongoDB
const ConnectionDB = require("./db/ConnectionDB");

const port = process.env.PORT || 4000;

// Import Route
const login = require("./routes/login");
const register = require("./routes/register");
const inputFile = require("./routes/inputFile");
const userSystem = require("./routes/userSystem");
const emailSystem = require("./routes/emailSystem");
const nilaiStudent = require("./routes/nilaiStudent");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/user", userSystem);
app.use("/api/file", inputFile);
app.use ("/api/sendMail", emailSystem);
app.use("/api/nilaiStudent", nilaiStudent);
  

const startServer = async () => {
  try {
    await ConnectionDB(process.env.MONGODB_ATLAS);
    server.listen(port, () => console.log(`Your Server Running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();