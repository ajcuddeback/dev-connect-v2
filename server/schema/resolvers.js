// resolvers
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const sequelize = require('../config/connection')
const { 
    User,
    Group, 
    Event, 
    Event_Users, 
    Group_Users 
} = require('../models')

const resolvers = {
    Query : {
        me: async (parent, args, context) => {
            console.log(context.user)
            if(context.user) {
                const userData = await User.findOne({
                    where: {
                        id: context.user.id
                    },
                    include: [
                        {
                            model: Group,
                            attributes: ["group_title"],
                            through: Group_Users,
                            as: "group_user",
                        }, 
                        {
                            model: Event,
                            attributes: ["event_title"],
                            through: Event_Users,
                            as: "event_user"
                        }
                    ]
                })

                return userData;
            }

            throw new AuthenticationError('You need to be logged in!')
        },
        users: async () => {
           return User.findAll({})
        },
        myGroups: async (parent, args, context) => {

            console.log(context.user)
            if(context.user) {
                const userData = await Group.findAll({
                    where: {
                        user_id: context.user.id
                    },
                    attributes: [
                        'id',
                        'group_title',
                        'group_text',
                        'group_zip',
                        [sequelize.literal('(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)'), 'users_count'],
                    ],
                    include: [
                        {
                            model: Event,
                            attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
                        }
                    ]
                })
                console.log(userData)

                return userData;
            }

            throw new AuthenticationError('You need to be logged in!')
        }
    }, 
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)

            const token = signToken(user);

            return { token, user }
        }, 
        login: async (paren, {username, password}) => {
            const user = await User.findOne({
                where: {
                    username: username
                }
            });

            if(!user) {
                throw new AuthenticationError('Incorrect Credentials!')
            };

            const correctPw = (await user).checkPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Credentials!')
            }

            const token = signToken(user);

            return { token, user };
        },
        createGroup: async (parent, { group_title, group_text, group_zip }, context) => {
            if(context.user.id) {
                const data = await Group.create({
                    group_title: group_title,
                    group_text: group_text,
                    group_zip: group_zip,
                    user_id: context.user.id
                })
                
                return data;
            }

            throw new AuthenticationError('You need to be signed in!')
        }
    }
}

module.exports = resolvers;