const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/article"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);

  app.use(express.static(__dirname+'/../frontend/build'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/../frontend/build/index.html')
  });
});