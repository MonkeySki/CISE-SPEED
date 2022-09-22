const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../config.env" });
const Db = process.env.ATLAS_URI;
console.log("In conn 1"); 
console.log(process.env.ATLAS_URI); 
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("In conn 2"); 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("cise");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};

