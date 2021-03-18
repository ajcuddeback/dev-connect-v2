const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../../config/connection');

class QuestionTag extends Model {}

QuestionTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: INTEGER,
      references: {
          model: 'question',
          key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'tag',
          key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'question_tag',
  }
);

module.exports = QuestionTag;