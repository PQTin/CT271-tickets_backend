const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Ticket = require("./Ticket")(sequelize, Sequelize);
db.Movie = require("./Movie")(sequelize, Sequelize);
db.Room = require("./Room")(sequelize, Sequelize);
db.Seat = require("./Seat")(sequelize, Sequelize);
db.Showtime = require("./Showtime")(sequelize, Sequelize);

// Define relationships
db.Movie.hasMany(db.Showtime, { foreignKey: "movie_id" });
db.Showtime.belongsTo(db.Movie, { foreignKey: "movie_id" });

db.Room.hasMany(db.Showtime, { foreignKey: "room_id" });
db.Showtime.belongsTo(db.Room, { foreignKey: "room_id" });

db.Room.hasMany(db.Seat, { foreignKey: "room_id" });
db.Seat.belongsTo(db.Room, { foreignKey: "room_id" });

db.Showtime.hasMany(db.Ticket, { foreignKey: "showtime_id" });
db.Ticket.belongsTo(db.Showtime, { foreignKey: "showtime_id" });

db.Seat.hasMany(db.Ticket, { foreignKey: "seat_id" });
db.Ticket.belongsTo(db.Seat, { foreignKey: "seat_id" });

db.User.hasMany(db.Ticket, { foreignKey: "user_id" });
db.Ticket.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;
