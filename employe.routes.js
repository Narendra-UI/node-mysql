module.exports = app => {
    const employes = require("../controllers/employe.controler.js");
  
    var router = require("express").Router();

    router.post("/", employes.create);              //this route ->create method in employe.controler.js

    router.get("/", employes.findAll);              //this route ->findAll method in employe.controler.js

    router.get("/published", employes.findAllPublished);    //this route ->findAllPublished method in employe.controler.js

    router.get("/:id", employes.findOne);           //this route ->findOne method in employe.controler.js
    
    router.put("/:id", employes.update);            //this route ->update method in employe.controler.js
    
    router.delete("/:id", employes.delete);         //this route ->delete method in employe.controler.js
    
    router.delete("/", employes.deleteAll);         //this route ->delete method in employe.controler.js
    
    app.use('/api/employes', router);       //postman URL 
};