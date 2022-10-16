const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const articleRoutes = express.Router();

const article = require("../../model/article")

// This will help us connect to the database
const dbo = require("../../db/conn");
const { json } = require("body-parser");
const { response } = require("express");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
articleRoutes.route("/article").get(function (req, res) {
  let db_connect = dbo.getDb("cise");
  console.log("HERe")
  db_connect
    .collection("articles")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
articleRoutes.route("/article/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("articles")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
articleRoutes.route("/article/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    author: req.body.author,
    journal: req.body.journal,
    year: req.body.year,
    volume: req.body.volume,
    number: req.body.number,
    pages: req.body.pages,
    doi: req.body.doi,
    claim: req.body.claim,
    claimStrength: req.body.claimStrength
  };

  const evideince = new article(myobj);
  db_connect.collection("articles").insertOne(evideince, function (err, res) {
    console.log("HERE")
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
articleRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      title: req.body.title,
      author: req.body.author,
      journal: req.body.journal,
      year: req.body.year,
      volume: req.body.volume,
      number: req.body.number,
      pages: req.body.pages,
      doi: req.body.doi,
      claim: req.body.claim,
      claimStrength: req.body.claimStrength

    },
  };
  db_connect.collection("articles").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    else
      console.log(res);
    response.json(res);
  });
});

// This section will help you delete a record
articleRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("articles").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});


//////////////////////
// MODERATOR ROUTES //
//////////////////////
// This section will help you get a list of all the records.
articleRoutes.route("/moderator").get(function (req, res) {
  let db_connect = dbo.getDb("cise");
  console.log("ww")
  db_connect
    .collection("moderator")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
})

// This section will help you get a single moderator record by id
articleRoutes.route("/moderator/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("moderator")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new moderator record.
articleRoutes.route("/moderator/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    author: req.body.author,
    journal: req.body.journal,
    year: req.body.year,
    volume: req.body.volume,
    number: req.body.number,
    pages: req.body.pages,
    doi: req.body.doi,
    claim: req.body.claim,
    claimStrength: req.body.claimStrength
  };

  const evidence = new article(myobj);
  db_connect.collection("moderator").insertOne(evidence, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

articleRoutes.route('/moderator/delete/:id').delete(function (req, res) {
  let db_connect = dbo.getDb("cise");

  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("moderator")
    .deleteOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
})





//////////////////////
//  ANALYST ROUTES  //
//////////////////////

articleRoutes.route("/analyst").get(function (req, res) {
  let db_connect = dbo.getDb("cise");
  db_connect
    .collection("analyst")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single analyst record by id
articleRoutes.route("/analyst/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("analyst")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new analyst record.
articleRoutes.route("/analyst/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    author: req.body.author,
    journal: req.body.journal,
    year: req.body.year,
    volume: req.body.volume,
    number: req.body.number,
    pages: req.body.pages,
    doi: req.body.doi,
    claim: req.body.claim,
    claimStrength: req.body.claimStrength

  };

  const evidence = new article(myobj);
  db_connect.collection("analyst").insertOne(evidence, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});


///////////////////////
//  REJECTED ROUTES  //
///////////////////////

articleRoutes.route("/rejected").get(function (req, res) {
  let db_connect = dbo.getDb("cise");
  db_connect
    .collection("rejected")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single moderator record by id
articleRoutes.route("/rejected/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("moderator")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new moderator record.
articleRoutes.route("/rejected/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    author: req.body.author,
    journal: req.body.journal,
    year: req.body.year,
    volume: req.body.volume,
    number: req.body.number,
    pages: req.body.pages,
    doi: req.body.doi,
    claim: req.body.claim,
    claimStrength: req.body.claimStrength


  };

  const evidence = new article(myobj);
  db_connect.collection("rejected").insertOne(evidence, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

articleRoutes.delete('/rejected/delete/:id', (req, res) => {
  var id = req.params.id;
  db_connect.collection("moderator").deleteOne(id, function (err, res) {
    if (err) throw err;
    response.json(res);
  }

  );
});



module.exports = articleRoutes;
