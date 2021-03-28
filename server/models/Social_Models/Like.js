const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Like extends Model {}

Like.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Post',
          key: 'id'
        }
      }
     
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'like'
  }
);

module.exports = Like;