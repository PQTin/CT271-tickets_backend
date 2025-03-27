module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      avatar_url: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("admin", "client"),
        allowNull: false,
        defaultValue: "client",
      },
    },

    {
      timestamps: false,
      tableName: "users",
    }
  );

  return User;
};
