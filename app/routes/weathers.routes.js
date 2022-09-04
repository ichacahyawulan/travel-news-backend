// Dokumentasi API atau Routes API
module.exports = app => {
    const weathers = require("../controllers/weathers.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Weathers
    router.post("/", weathers.create);
  
    // Retrieve all Weathers
    router.get("/", weathers.findAll);
  
    // Retrieve a single Weathers with id
    router.get("/:id", weathers.findOne);
  
    // Update a weathers with id
    router.put("/:id", weathers.update);
  
    // Delete a Weathers with id
    router.delete("/:id", weathers.delete);
  
    app.use('/api/weathers', router);
  };