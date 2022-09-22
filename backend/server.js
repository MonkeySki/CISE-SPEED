const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(require("./routes/api/article"));
console.log(`Before connection`);
// get driver connection
const dbo = require("./db/conn");
if (process.env.NODE_ENV === 'production') {
  // serve front-end client from build folder
  app.use(express.static(__dirname+'/../frontend/build'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/../frontend/build/index.html')
  });
  console.log(`Production Run`);
  
} else {
  app.get('*', (req, res) => res.send(`API running on port ${port}`));
  console.log(`Not Production Run`);
}

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);

  
});
