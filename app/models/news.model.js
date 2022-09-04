module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      author: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      publish: {
        type: Sequelize.BOOLEAN
      },
      content: {
        type: Sequelize.TEXT
      },
      locationLink: {
        type: Sequelize.STRING
      },
      views: {
        type: Sequelize.INTEGER
      },
      pictLink: {
        type: Sequelize.STRING
      }
    });
  
    return News;
  };