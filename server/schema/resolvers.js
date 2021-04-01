// resolvers
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');
const axios = require('axios');
const { 
    User,
    Group, 
    Event, 
    Event_Users, 
    Group_Users 
} = require('../models');
const { response } = require('express');

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
        },
        groups: async () => {
            const groupData = await Group.findAll({
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
            });

            return groupData;
        },
        group: async (parent, { group_id }) => {
            const groupData =  await Group.findOne({
                where: {
                    id: group_id
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
            });

            return groupData;
        },
        groupByZip: async (parent, { group_zip, miles }) => {
            const apiUrl = `https://www.zipcodeapi.com/rest/${process.env.ZIPRADIUSKEY}/radius.json/${group_zip}/${miles}/miles?minimal`;
            const intData = [];
             await axios.get(apiUrl).then((response) => {
                const zipArr = response.data.zip_codes
                intData = zipArr.map(zip_code => parseInt(zip_code))
            }).catch(err => {
                console.log(err)
            });
            console.log(intData)


            const Op = Sequelize.Op;
            const data = await Group.findAll({
                where: {
                    group_zip: {
                        [Op.or]: intData
                    }
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
            console.log(data)
            return data;
            
            
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
