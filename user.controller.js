const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body) {//json body from the UI {name:''.........}
    res.status(400).send({    //if it fail to load data then it will give error 404
      message: "Content can not be empty!"
    });
  }
  const user = new User ({  /// this will call constructor in employee model class
    name: req.body.name,    //the below data was given by user via UI
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    address: req.body.address,
    role: req.body.role,
    password: req.body.password,
  });
    
  User.create(user, (err, data) => {//(user and callback function(data in model)=>(err,res))
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
        });
        else res.send(data);
        });
};

    // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    User.getAll(name, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving users."
        });
        else res.send(data);
        });
};

exports.findOne = (req, res) => { 
        User.findById(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found User with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving User with id " + req.params.id
              });
            }
          } else res.send(data);
        });
};

exports.findAllPublished = (req, res) => {
        User.getAllPublished((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving users."
            });
          else res.send(data);
        });
};


exports.update = (req, res) => {
        // Validate Request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        console.log(req.body);
      
        User.updateById(
          req.params.id,
          new User(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found User with id ${req.params.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating User with id " + req.params.id
                });
              }
            } else res.send(data);
          }
        );
};


exports.delete = (req, res) => {
        User.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found User with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Employe with id " + req.params.id
              });
            }
          } else res.send({ message: `Employe was deleted successfully!` });
        });
};


exports.deleteAll = (req, res) => {
        User.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all Users."
            });
          else res.send({ message: `All Users were deleted successfully!` });
        });
};

exports.login = (req, res)=>{
  User.login(req.body.name,req.body.password,(err, data)=>{
    if(err)
      res.status(500).send({
        message:
          err.message || "some error occured while login."
      });
      else res.send({ message: data.length == 0 ? 'not logging':`successfully logged in`,data})
  });

}