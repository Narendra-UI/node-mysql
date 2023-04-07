const Employe = require("../models/employe.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  console.log("_______________________________");
  console.log(req); // { body:"values"}
  //console.log(res);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a employe
  const employe = new Employe ({  /// this will call constructor in employee model class
    empName: req.body.empName,
    empDesignation: req.body.empDesignation,
    empDepartment: req.body.empDepartment,
  });
    
  Employe.create(employe, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Employe."
        });
        else res.send(data);
        });
};

    // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Employe.getAll(title, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employes."
        });
        else res.send(data);
        });
};

exports.findOne = (req, res) => { 
        Employe.findById(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Employe with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Employe with id " + req.params.id
              });
            }
          } else res.send(data);
        });
};

exports.findAllPublished = (req, res) => {
        Employe.getAllPublished((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving employes."
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
      
        Employe.updateById(
          req.params.id,
          new Employe(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Employe with id ${req.params.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Employe with id " + req.params.id
                });
              }
            } else res.send(data);
          }
        );
};


exports.delete = (req, res) => {
        Employe.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Employe with id ${req.params.id}.`
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
        Employe.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all employes."
            });
          else res.send({ message: `All Employes were deleted successfully!` });
        });
};