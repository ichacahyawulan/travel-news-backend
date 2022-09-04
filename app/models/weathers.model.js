module.exports = (sequelize, Sequelize) => {
    const Weather = sequelize.define("weather", {
      date: {
        type: Sequelize.DATE(6)
      },
      location: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      temperature: {
        type: Sequelize.INTEGER
      },
      humidity: {
        type: Sequelize.INTEGER
      },
      pictLink: {
          type: Sequelize.STRING
      }
    });
    return Weather;
  };