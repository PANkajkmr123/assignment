var mongoose = require('mongoose');

module.exports = mongoose.model('Candidate', {
   name: {type: String, default: ''},
   email: { type: String, trim: true, index: { unique: true } },
   score_first: {type: Number, default: ''},
   score_second: {type: Number},
   score_third: {type: Number },
   score_total: {type: Number},
});