const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');


class Event extends Model {
    static addUser(body, user_id, models) {
        return models.Event_Users.create({
            user_id: user_id,
            event_id: body.event_id
        }).then(() => {
            return Event.findOne({
                where: {
                    id: body.event_id
                },
                attributes: [
                    'id',
                    'event_title',
                    'event_text',
                    'event_location',
                    'event_time',
                    [sequelize.literal('(SELECT COUNT(*) FROM event_users WHERE event.id = event_users.event_id)'), 'users']
                ]
            });
        });
    }
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        event_location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        event_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'group',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'event'
    }
);

module.exports = Event;