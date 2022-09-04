const authJwt = require("../middleware/authJwt.js");
// Dokumentasi API atau Routes API
module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Users
    router.post("/signup", users.create);

    //Login user
    router.post("/login", users.login);

    //Change Password
    router.put("/change-password", authJwt.authenticateUser, users.changePassword);
  
    // Retrieve all Users
    router.get("/", users.findAll);
  
    // Retrieve a single Users with id
    router.get("/:id", users.findOne);
  
    // Update a Users with id
    router.put("/:id", users.update);
  
    // Delete a Users with id
    router.delete("/delete/:id", authJwt.authenticateAdmin, users.delete);

    // Save news
    router.post("/save", authJwt.authenticateUser, users.saveNews);
    
    // Remove saved news
    router.post("/unsave", authJwt.authenticateUser, users.removeSavedNews)

    // Like news
    router.post("/like", authJwt.authenticateUser, users.likeNews);
    
    // Get user with News Saved
    router.get("/profile/:id", authJwt.authenticateUser, users.getSavedUser);
  
    app.use('/api/users', router);
  };