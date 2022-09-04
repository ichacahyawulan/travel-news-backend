const authJwt = require("../middleware/authJwt.js");
const uploadImage = require("../middleware/imageUpload.js");

// Dokumentasi API atau Routes API
module.exports = app => {
    const news = require("../controllers/news.controller.js");
  
    var router = require("express").Router();
  
    // Create a new news
    router.post("/", authJwt.authenticateAdmin, uploadImage.imageUpload, news.create);
  
    // Retrieve all News
    router.get("/", news.findAll);

    // Retrive news by search
    router.get("/title/:title", news.findBySearch);

  
    // Retrieve a single News with id
    router.get("/id/:id", news.findOne);
  
    // Update a News with id
    router.put("/id/:id", authJwt.authenticateAdmin, news.update);

    // Update a News for views
    router.put("/:id", news.update);
  
    // Delete a News with id
    router.delete("/:id", authJwt.authenticateAdmin, news.delete);

    //add category
    router.post("/category", authJwt.authenticateAdmin, news.addNewsCategory);

    // get newest news
    router.get("/newest", news.getNewestNews);
    
    // get popular news
    router.get("/popular", news.getPopularNews);

    // Retrieve 3 Newest News
    router.get("/newestNews", news.findNewest);

    //get news and category
    router.get("/newsCategory", news.getNewsandCategory);

    //Get news by category's name
    router.get("/newsCategory/:name", news.getNewsWithCategoryName);
    
  
    app.use('/api/news', router);
  };
