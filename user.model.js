const sql = require("./db.js");

// constructor
const User = function(user) {   //User data comes from the controller
  this.name = user.name;
  this.age = user.age;
  this.gender = user.gender;
  this.email = user.email;
  this.address = user.address;
  this.role = user.role;
  this.password = user.password;
};

User.create = (newUser, result) => {    //result means callBack(err,data) in controller
    console.log(newUser);
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => { //query inserted in database AccTo newUser
      if (err) {
        console.log("error: ", err);
        result(err, null);          //if it have error otherwise
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });    //the data was inserted in database
      result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
};


User.getAll = (Name, result) => {
    let query = "SELECT * FROM users";
  
    if (Name) {
      query += ` WHERE Name LIKE '%${Name}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
};


User.getAllPublished = result => {
    sql.query("SELECT * FROM users WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("employes: ", res);
      result(null, res);
    });
};


User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE users SET name = ?, age = ?, gender = ? WHERE id = ?",
      [user.name, user.age, user.gender, user.email,user.address,user.role, id],
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
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
};


User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  
  User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };

  User.login = (name, password,result) =>{
    sql.query ("SELECT * FROM users WHERE name=? and password=? ",
    [name,password],
    (err, res) =>{
      if (err) {
        console.log("error: ", err);
        result( null,err);
        return;
      }

      console.log("login: ", res);
      result(null, res);
    });
  }
  
  module.exports = User;