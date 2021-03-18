const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Group extends Model {
  static addUser(body, user_id, models) {
    return models.Group_Users.create({
      user_id: user_id,
      group_id: body.group_id,
    }).then(() => {
      return Group.findOne({
        where: {
          id: body.group_id,
        },
        attributes: [
          "id",
          "group_title",
          "group_text",
          "group_zip",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)"
            ),
            "users",
          ],
        ],
      });
    });
  }
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    group_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    group_zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "group",
  }
);

module.exports = Group;
