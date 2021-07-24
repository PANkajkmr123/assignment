var Candidate = require("../models/candidate")

class Candidates {

	async create(req, res) {
		var candidate = new Candidate()
		candidate.name = req.body.name
		candidate.email = req.body.email

		candidate.save(function(err){
			if(err){
				res.send({ "code": 500, "message": "Data can not be saved", "result": err })
			}else{
				res.send({ "code": 200, "message": "Data created successfuly", "candidate": candidate})
			}
		})
	}

	async index(req, res){
		Candidate.find(function(err, candidates){
			if(err){
				res.send({ "code": 500, "message": "Data can not be saved", "result": err })
			}else{
				res.send({ "code": 200, "message": "Data fetched successfuly", "candidates": candidates})
			}
		})
	}


}


module.exports = Candidates