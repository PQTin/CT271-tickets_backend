module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      seat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "seats",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      showtime_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "showtimes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM("unused", "used", "expired", "refunded"),
        allowNull: false,
        defaultValue: "unused", // Mặc định khi đặt vé là "unused"
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "tickets",
    }
  );

  return Ticket;
};
