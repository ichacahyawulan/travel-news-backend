const { categorys, users } = require("../models");
const db = require("../models");
const News = db.news;
const Categorys = db.categorys;
const Users = db.users;
const Op = db.Sequelize.Op;
const path = require("path");

// Create and Save a new News
// Create and Save a new News
exports.create = async (req, res) => {

  let filePath = null;

  // Validate request
if (!req.body.content || !req.body.author || !req.body.title) {
  res.status(400).send({
    message: "Author, Title, Content cannot be empty!"
  });
  return;
}

if (req.file){
  filePath = req.file.path.replace(/\\/gi, "/");
}

// Create a News
const news = {
  author: req.body.author,
  title: req.body.title,
  publish: req.body.publish,
  content: req.body.content,
  locationLink: req.body.locationLink,
  views: 0,
  pictLink: filePath
};
// V1
// await Categorys.findByPk(req.body.categoryId)
//   .then((categorys) => {
//     if (!categorys){
//       console.log("category not found!");
//     }
//     else{
//       newsCreate.addCategory(categorys);
//       res.send(newsCreate);
//     }
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error while create News"
//     });
//   });

// V2 Save news and newsCategory in database
try{
  const newsCreate = await News.create(news);
  if (req.body.categoryId){
    for (const index in req.body.categoryId){
      const categoryAdd = await Categorys.findByPk(req.body.categoryId[index]);
      newsCreate.addCategory(categoryAdd);
      res.send(newsCreate);
    }
  }
}
catch(err){
  err.message
}
  
  // if(req.body.categoryId){
  //   const categoryAdd1 = await Categorys.findByPk(req.body.categoryId);
  //   if(!categoryAdd1){
  //     console.log("Category not found!");
  //   }
  //   else{
  //     newsCreate.addCategory(categoryAdd1);
  //     res.send(newsCreate);
  //   }
  // }
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  News.findAll({
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving News."
      });
    });
};

// Find a single News with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  News.findByPk(id,{
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Users,
        as: "NewsLiked",
        attributes: ["id","username"],
        through: {
          attributes: [],
        },
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving News with id" + id
      });
    });
};

//Retrieve all News from the database or by search.
exports.findBySearch= (req, res) => {
  const title = req.params.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  News.findAll({ where: condition,
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ]
  })
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

// Update a News by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
  News.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "News updated !"
        });
      } else {
        res.send({
          message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating News with id=" + id
      });
    });
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  News.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "News deleted!"
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete News with id=" + id
      });
    });
};

exports.addNewsCategory = (req, res) => {
  return News.findByPk(req.body.newsId)
    .then((news) => {
      if (!news) {
        console.log("News not found");
        return null;
      }
      return Categorys.findByPk(req.body.categoryId).then((categorys) => {
        if (!categorys) {
          console.log("Category not found");
          return null;
        }

        news.addCategory(categorys);
        res.send(news);
      });

    })
    .catch((err) => {
      console.log(">> Error while add news category: ", err);
    });
};

// Get Newest News
exports.getNewestNews = (req, res) => {
  News.findAll({where: { publish: true },
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving News."
      });
    });
};

//GET 3 berita terbaru
exports.findNewest = (req, res) => {
  News.findAll({where: { publish: true },
    order: [['createdAt', 'DESC']],
    limit: 3,
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error while retrieve news with category"
      });
    });
}

// Get Popular News
exports.getPopularNews = (req, res) => {
  News.findAll({where: { publish: true },
    order: [['views', 'DESC']],
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving News."
      });
    });
};

//get news with category
exports.getNewsandCategory = (req,res) => {
  return News.findAll({ where: { publish: true },
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(">> Error while retrieving news: ", err);
    });
};

exports.getNewsWithCategoryName = (req,res) => {
  const name = req.params.name;
  return News.findAll({ where: { publish: true },
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        where: {
          name: { [Op.iLike] : name }
        }
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(">> Error while retrieving news: ", err);
    });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
  News.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} News were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all news."
      });
    });
};

// find all published News
exports.findAllPublished = (req, res) => {
  News.findAll({ where: { publish: true },
    include: [
      {
        model: Categorys,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news."
      });
    });
};