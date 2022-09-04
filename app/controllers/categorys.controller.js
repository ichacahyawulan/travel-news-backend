const db = require("../models");
const Categorys = db.categorys;
const News = db.news;
const Op = db.Sequelize.Op;
const path = require("path");

// Create and Save a new Categorys
exports.create = (req, res) => {
  let filePath = null;

    // Validate request
  if (!req.body.name || req.body.isLocation===undefined) {
    res.status(400).send({
      message: "Name and isLocation can not be empty!"
    });
    return;
  }

  if (req.file){
    filePath = req.file.path.replace(/\\/gi, "/");
  }

  // Create a Categorys
  const categorys = {
    name: req.body.name,
    isLocation: req.body.isLocation,
    pictLink: filePath
  };

  // Save Categorys in the database
  Categorys.create(categorys)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Categorys."
      });
    });
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
  Categorys.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys."
      });
    });
};

// Find a single Categorys with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categorys.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Categorys with id" + id
      });
    });
};

// Update a categorys by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Categorys.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categorys updated !"
        });
      } else {
        res.send({
          message: `Cannot update Categorys with id=${id}. Maybe Categorys was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Categorys with id=" + id
      });
    });
};

// Delete a Categorys with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Categorys.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categorys deleted!"
        });
      } else {
        res.send({
          message: `Cannot delete Categorys with id=${id}. Maybe Categorys was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Categorys with id=" + id
      });
    });
};

// // GET All Categorys with query location
// exports.findAll = (req, res) => {
//   // const location = req.query.location;
//   // var condition = location ? { location: { [Op.iLike]: `%${location}%` } } : null;
//    const isLocation = req.query.isLocation;
//    var condition = isLocation ? { isLocation: { [Op.eq]: isLocation } } : null;

//   Categorys.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
// Get Location Category
exports.getLocationCategory = (req, res) => {
  Categorys.findAll({ where: { isLocation: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.getCulinaryCategory = (req, res) => {
  Categorys.findAll({ where: { name: {[Op.like]: 'kuliner'} } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Adding News Category
// exports.addNewsCategory = (req, res) => {
//     // Validate request
//   if (!req.body.newsId || !req.body.categorysId) {
//     res.status(400).send({
//       message: "newsId dan categorysId cannot be empty!"
//     });
//     return;
//   }

//   return Categorys.findByPk(req.body.categorysId)
//     .then((category) => {
//       if (!category) {
//         console.log("category not found!");
//         return null;
//       }
//       return News.findByPk(req.body.newsId)
//       .then((news) => {
//         if (!news) {
//           console.log("News not found!");
//           return null;
//         }

//         // await Categorys.addNewsCategory(req.body.categorysId, tut3.id);
//         category.addNewsCategory(news);
//         console.log(`>> added news id=${news.id} to category id=${category.id}`);
//         return category;
//       });
//     })
//     .catch((err) => {
//       console.log(">> Error while adding news category: ", err);
//     });
//   };
  
  // exports.addNewsCategory = (req, res) => {
  //   // Validate request
  // if (!req.body.newsId || !req.body.categorysId) {
  //   res.status(400).send({
  //     message: "newsId dan categorysId cannot be empty!"
  //   });
  //   return;
  // }
  
  // // Create a Categorys
  // const newscategory = {
  //   news_id: req.body.newsId,
  //   category_id: req.body.isLocation
  // };
  
  // // Save Categorys in the database
  // Categorys.create(categorys)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Categorys."
  //     });
  //   });
  // };

exports.addNewsCategory = (categorysId, newsId) => {
  return Categorys.findByPk(categorysId)
    .then((category) => {
      if (!category) {
        console.log("category not found!");
        return null;
      }
      return News.findByPk(newsId).then((news) => {
        if (!news) {
          console.log("News not found!");
          return null;
        }

        category.addNewsCategory(news);
        console.log(`>> added news id=${news.id} to category id=${category.id}`);
        return category;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding news category: ", err);
    });
};

