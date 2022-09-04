module.exports = (sequelize, Sequelize) => {
    const Gallery = sequelize.define("gallery", {
      title: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      }
    });
  
    return Gallery;
  };