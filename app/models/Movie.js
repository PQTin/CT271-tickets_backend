module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define(
    "Movie",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      trailer_url: {
        type: Sequelize.STRING,
      },
      poster_url: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "movies",
    }
  );

  return Movie;
};
