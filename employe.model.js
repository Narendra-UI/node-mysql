const sql = require("./db.js");

// constructor
const Employe = function(employe) {
  this.empName = employe.empName;
  this.empDesignation = employe.empDesignation;
  this.empDepartment = employe.empDepartment;
};

Employe.create = (newEmploye, result) => {
    console.log(newEmploye);
    sql.query("INSERT INTO employes SET ?", newEmploye, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created employe: ", { id: res.insertId, ...newEmploye });
      result(null, { id: res.insertId, ...newEmploye });
    });
};

Employe.findById = (id, result) => {
    sql.query(`SELECT * FROM employes WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found employe: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
};


Employe.getAll = (empName, result) => {
    let query = "SELECT * FROM employes";
  
    if (empName) {
      query += ` WHERE empName LIKE '%${empName}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("employes: ", res);
      result(null, res);
    });
};


Employe.getAllPublished = result => {
    sql.query("SELECT * FROM employes WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("employes: ", res);
      result(null, res);
    });
};


Employe.updateById = (id, employe, result) => {
    sql.query(
      "UPDATE employes SET empName = ?, empDesignation = ?, empDepartment = ? WHERE id = ?",
      [employe.empName, employe.empDesignation, employe.empDepartment, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated employe: ", { id: id, ...employe });
        result(null, { id: id, ...employe });
      }
    );
};


Employe.remove = (id, result) => {
    sql.query("DELETE FROM employes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Employe with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted employe with id: ", id);
      result(null, res);
    });
  };
  
  Employe.removeAll = result => {
    sql.query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} employes`);
      result(null, res);
    });
  };
  
  module.exports = Employe;