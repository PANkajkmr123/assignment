var Candidate = require("../models/candidate")

class Scores {

	async create(req, res) {
		if(req.body.score){
			var score = parseInt(req.body.score)
			if(score>10 || score<0){
				res.send({ "code": 422, "message": "Please enter a valid score" })
			}else{
				Candidate.findOne({"_id": req.body.user_id}, function(err, user){
					if(err){
						res.send({ "code": 500, "message": "Data can not be saved", "result": err })
					}else{
						if(user){
							var testName = req.body.testName

							if(testName=="first"){
								user.score_first = score
							}else if(testName=="second"){
								user.score_second = score
							}else if(testName=="third"){
								user.score_third = score
							}

							user.score_total = parseInt(user.score_first ? user.score_first : 0)+parseInt(user.score_second ? user.score_second : 0)+parseInt(user.score_third ? user.score_third : 0)

							user.save(function(err){
								if(err){
									res.send({ "code": 500, "message": "Data can not be saved", "result": err })
								}else{
									res.send({ "code": 200, "message": "Data created successfuly", "candidate": user})
								}
							})

						}else{
							res.send({ "code": 404, "message": "Candidate not found" })
						}
					}

				})
					
			}
		}else{
			res.send({ "code": 422, "message": "Score must be present" })
		}
	}

	async highScore(req, res){
		Candidate.findOne({ },null,{ sort : { score_total : -1}},function(err, candidate) {
			if(err){
				res.send({ "code": 500, "message": "Something went wrong", "result": err })
			}else{
				res.send({ "code": 200, "message": "Data fetched successfuly", "candidate": candidate})
			}
		});
	}

	async avgScores(req, res){
		var firstScores = []
		var secondScores = []
		var thirdScores = []

		Candidate.find(function(err, users){

			if(err){
				res.send({ "code": 500, "message": "Something went wrong", "result": err })
			}else{

				users.forEach((user) => {
					firstScores.push(user.score_first ? user.score_first : 0)
					secondScores.push(user.score_second ? user.score_second : 0)
					thirdScores.push(user.score_third ? user.score_third : 0)
				});

				var firstAvg = 0
				if(firstScores.length>0){
					var sum = firstScores.reduce((a, b) => a + b, 0)
					var total = firstScores.length
					firstAvg = sum/total
				}

				var secondAvg = 0
				if(secondScores.length>0){
					var sum = secondScores.reduce((a, b) => a + b, 0)
					var total = secondScores.length
					secondAvg = sum/total
				}

				var thirdAvg = 0
				if(thirdScores.length>0){
					var sum = thirdScores.reduce((a, b) => a + b, 0)
					var total = thirdScores.length
					thirdAvg = sum/total
				}


				var result = {
					"firstAvg": firstAvg,
					"secondAvg": secondAvg,
					"thirdAvg": thirdAvg
				}
				res.send({ "code": 200, "message": "Data fetched successfuly", "result":  result})
			}

		})

	}


}


module.exports = Scores