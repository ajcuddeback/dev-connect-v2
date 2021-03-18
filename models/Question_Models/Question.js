const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Question extends Model {}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'question'
    }
);

module.exports = Question;