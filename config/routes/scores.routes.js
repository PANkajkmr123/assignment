var express = require('express');
var router = express.Router()

var scoresController = require("../../app/controllers/scores")
var scores = new scoresController()

router.post("/create", scores.create)
router.get("/high", scores.highScore)
router.get("/avg", scores.avgScores)

module.exports = router