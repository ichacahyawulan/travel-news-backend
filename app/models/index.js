const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.news = require("./news.model.js")(sequelize, Sequelize);
db.categorys = require("./categorys.model.js")(sequelize, Sequelize);
db.gallerys = require("./gallerys.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.weathers = require("./weathers.model.js")(sequelize, Sequelize);

//sync
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//define relation
//many to many news and category
db.categorys.belongsToMany(db.news, {
  through: "newsCategory"
});
db.news.belongsToMany(db.categorys, {
  through: "newsCategory"
});

db.users.belongsToMany(db.news, {
  through: "newsSaved",
   as: "NewsSaved"
});
db.news.belongsToMany(db.users, {
  through: "newsSaved",
  as: "NewsSaved"
});

db.users.belongsToMany(db.news, {
  through: "newsLiked",
  as: "NewsLiked"
});
db.news.belongsToMany(db.users, {
  through: "newsLiked",
   as: "NewsLiked"
});


module.exports = db;



