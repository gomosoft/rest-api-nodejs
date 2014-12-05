// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var candidate_data = require('./plugins/candidate_data');
var user = require('./plugins/user');


var candidateSchema = new Schema({
	 _cv : {type: Schema.Types.ObjectId, required : true}
});



//add createdAt, updatedAt fields
candidateSchema.plugin(user);
candidateSchema.plugin(location);
candidateSchema.plugin(candidate_data);
candidateSchema.plugin(timestamps);




module.exports = mongoose.model('Candidate', candidateSchema); 