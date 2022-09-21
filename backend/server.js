// app.js
const express = require("express");
const connectDB = require("../config/Db");
var cors = require("cors");

// routes
const post = require("./controller/articleController");

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: true,
  credentials: true,
};

// init cors
app.use(cors(corsOptions));

// init body parser
app.use(express.json());

// use Routes
app.get("/test", post.test);
app.post("/test", post.testPost);

// Connect Database
connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "frontend/build/index.html");
  });
} else {
  app.get("*", (req, res) => res.send(`API running on port ${port}`));
}

app.listen(port, () => console.log(`Server running on port ${port}`));