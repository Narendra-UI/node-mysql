const Role = require("../models/role.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const role = new Role ({  /// this will call constructor in employee model class
    roleName: req.body.roleName,
  });
    
  Role.create(role, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Role."
        });
        else res.send(data);
        });
};

    // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const roleName = req.query.roleName;

    Role.getAll(roleName, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving role."
        });
        else res.send(data);
        });
};

exports.findOne = (req, res) => { 
        Role.findById(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found role with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving role with id " + req.params.id
              });
            }
          } else res.send(data);
        });
};

exports.findAllPublished = (req, res) => {
        Role.getAllPublished((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving role."
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
      
        Role.updateById(
          req.params.id,
          new Role(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Role with id ${req.params.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Role with id " + req.params.id
                });
              }
            } else res.send(data);
          }
        );
};


exports.delete = (req, res) => {
        Role.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found role with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete role with id " + req.params.id
              });
            }
          } else res.send({ message: `Role was deleted successfully!` });
        });
};


exports.deleteAll = (req, res) => {
        Role.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all Role."
            });
          else res.send({ message: `All Role were deleted successfully!` });
        });
};