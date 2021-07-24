var express = require('express');
var router = express.Router()

var candidateController = require("../../app/controllers/candidates")
var candidates = new candidateController()

router.post("/create", candidates.create)
router.get("/index", candidates.index)

module.exports = router