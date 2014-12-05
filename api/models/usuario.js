// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var candidate_data = require('./plugins/candidate_data');
var email = require('./plugins/email');
var active = require('./plugins/active');
var fullname = require('./plugins/fullname');
var Schema = mongoose.Schema;

// Define our Empresa schema
var UsuarioSchema = new mongoose.Schema({  
  config : {
      type : Object,
      default : {}
  }
});

//add full name
UsuarioSchema.plugin(fullname);
//add location field
UsuarioSchema.plugin(location);
//add candidate data
UsuarioSchema.plugin(candidate_data);
//add email
UsuarioSchema.plugin(email);
//add active
UsuarioSchema.plugin(active);
//add createdAt, updatedAt fields
UsuarioSchema.plugin(timestamps);

// Export the Mongoose model
module.exports = mongoose.model('Usuario', UsuarioSchema);