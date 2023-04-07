const sql = require("./db.js");

// constructor
const Role = function(role) {
  this.roleName = role.roleName;
};

Role.create = (newRole, result) => {
    console.log(newRole);
    sql.query("INSERT INTO role SET ?", newRole, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created role: ", { id: res.insertId, ...newRole });
      result(null, { id: res.insertId, ...newRole });
    });
};

Role.findById = (id, result) => {
    sql.query(`SELECT * FROM role WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found role: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
};


Role.getAll = (roleName, result) => {
    console.log(roleName);
    let query = "SELECT * FROM role";
  
    if (roleName) {
      query += ` WHERE roleName LIKE '%${roleName}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("role: ", res);
      result(null, res);
    });
};


Role.getAllPublished = result => {
    sql.query("SELECT * FROM role WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("role: ", res);
      result(null, res);
    });
};


Role.updateById = (id, role, result) => {
    sql.query(
      "UPDATE role SET roleName = ?",
      [role.roleName, id],
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
  
        console.log("updated role: ", { id: id, ...role });
        result(null, { id: id, ...role });
      }
    );
};


Role.remove = (id, result) => {
    sql.query("DELETE FROM role WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted role with id: ", id);
      result(null, res);
    });
  };
  
  Role.removeAll = result => {
    sql.query("DELETE FROM role", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} role`);
      result(null, res);
    });
  };
  
  module.exports = Role;