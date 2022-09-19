const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

// routes
const articles = require('./routes/articles');

const app = express();
const port = process.env.PORT || 8080;

// cors config - allow same origin
const corsOptions = {
  origin: true,
  credentials: true,
};

// // init cors
app.use(cors(corsOptions));

// init body parser
app.use(express.json());

// use routes here
app.use('/articles', articles);

// Connect Database
connectDB();
if (process.env.NODE_ENV === 'production') {
  // serve front-end client from build folder
  app.use(express.static(__dirname+'/../frontend/build'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/../frontend/build/index.html')
  });
  
} else {
  app.get('*', (req, res) => res.send(`API running on port ${port}`));
}

app.listen(port, () => console.log(`Server running on port ${port}`));