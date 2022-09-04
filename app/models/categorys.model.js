module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      name: {
        type: Sequelize.STRING
      },
      isLocation: {
        type: Sequelize.BOOLEAN
      },
      pictLink: {
        type: Sequelize.STRING
      }
    });
    return Category;
  };