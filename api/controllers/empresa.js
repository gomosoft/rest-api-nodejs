// Load required packages
var Empresa = require('../models/empresa');
var mongoose = require('mongoose');

var ctrlEmpresa = function (server) {

  function post(req, res) {
// Create a new instance of the Empresa model
    var empresa = new Empresa();

// Set the empresa properties that came from the POST data
    empresa.name = req.body.name;
    empresa.nit = req.body.nit;
    empresa.tel = req.body.tel;
    empresa.owner = req.body.owner;
    empresa._user_id = req.user._id;
    empresa.email = req.body.email;

// Save the empresa and check for errors
    empresa.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Empresa added', data: empresa});
    });
  }


  function get(req, res) {

// Use the Empresa model to find a specific empresa
     var query = {};
     query._user_id = req.params.userid ? mongoose.Types.ObjectId(req.params.userid) : false;
     query._id = req.params.empresaid ? new mongoose.Types.ObjectId(req.params.empresaid) : false;


// Use the Empresa model to find all empresa
    Empresa.find(query, function (err, empresas) {
      if (err) {
        res.send(err);
      }
      res.json(empresas);
    });

  }



  function put(req, res) {
// Use the Empresa model to find a specific empresa
    Empresa.update({
      userId: req.user._id,
      _id: req.params.empresa_id
    }, {
      name: req.body.name,
      nit: req.body.nit,
      tel: req.body.tel,
      owner: req.body.owner,
      email: req.body.email
    }, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Empresa model to find a specific empresa and remove it
    Empresa.remove({userId: req.user._id, _id: req.params.empresa_id}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Empresa removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/empresa/:userid', get);
  server.post(global.apiBaseUri + '/empresa/:userid', post);
  server.get(global.apiBaseUri + '/empresa/:userid/:empresaid', get);  
  server.put(global.apiBaseUri + '/empresa/:userid/:empresaid', put);
  server.del(global.apiBaseUri + '/empresa/:userid/:empresaid', del);
};

module.exports = ctrlEmpresa;