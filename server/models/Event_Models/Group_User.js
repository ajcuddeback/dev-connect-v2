const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Group_Users extends Model {}

Group_Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "group",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "group_users",
  }
);

module.exports = Group_Users;
