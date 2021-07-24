// modules =================================================
const express = require('express');
const app = express();
// set our port
const port = 3000;


// Importing Mongoose module for db
var mongoose = require('mongoose');

// Load the DB Connection
var db = require('./config/db/connection');
// console.log(db)
mongoose.connect(db.url, { useNewUrlParser: true,  useUnifiedTopology: true }); //Mongoose connection created

var bodyParser = require('body-parser')
app.use(bodyParser.json())


var candidatesRoutes = require("./config/routes/candidates.routes")
app.use("/api/candidates", candidatesRoutes)

var scoresRoutes = require("./config/routes/scores.routes")
app.use("/api/candidate/scores", scoresRoutes)

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));