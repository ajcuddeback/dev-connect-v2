const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');


class Event_Users extends Model { }

Event_Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'event',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'event_users'
    }
);

module.exports = Event_Users;