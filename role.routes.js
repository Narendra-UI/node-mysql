module.exports = app => {
    const role = require("../controllers/role.controller.js");
  
    var router = require("express").Router();

    router.post("/", role.create);              

    router.get("/", role.findAll);              
 
    router.get("/:id", role.findOne);           
    
    router.put("/:id", role.update);            
    
    router.delete("/:id", role.delete);         
    
    router.delete("/", role.deleteAll);         
    
    app.use('/api/role', router);       //postman URL 
};