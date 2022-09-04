const db = require("../models");
const Weather = db.weathers;
const Op = db.Sequelize.Op;

// Create and Save a new Weather
exports.create = (req, res) => {
    // Validate request
  if (!req.body.date || !req.body.location) {
    res.status(400).send({
      message: "Date and location can not be empty!"
    });
    return;
  }

  // Create a Weather
  const weather = {
    date: req.body.date,
    location: req.body.location,
    description: req.body.description,
    temperature: req.body.temperature, 
    humidity: req.body.humidity,
    pictLink: req.body.pictLink
  };

  // Save Weather in the database
  Weather.create(weather)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Weather."
      });
    });
};

// Retrieve all Weather from the database.
exports.findAll = (req, res) => {
  Weather.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weather."
      });
    });
};

// Find a single Weather with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Weather.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Weather with id" + id
      });
    });
};

// Update a Weather by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Weather.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Weather updated !"
        });
      } else {
        res.send({
          message: `Cannot update Weather with id=${id}. Maybe Weather was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Weather with id=" + id
      });
    });
};

// Delete a Weather with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Weather.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Weather deleted!"
        });
      } else {
        res.send({
          message: `Cannot delete Weather with id=${id}. Maybe Weather was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Weather with id=" + id
      });
    });
};

// GET All Weather with Location
exports.findAll = (req, res) => {
  const location = req.query.location;
  var condition = location ? { location: { [Op.iLike]: `%${location}%` } } : null;

  Weather.findAll({ where: condition })
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

//get 5 newest weather
exports.findNewest = (req, res) => {
  Weather.findAll({where:{order: [['createdAt', 'ASC']]},limit:5})
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
