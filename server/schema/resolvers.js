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
    Group_Users,
    Question,
    User_Friends
} = require('../models');
const { response } = require('express');

const resolvers = {
    // create, update, delete requests
    Query : {
        // ############################# User queries #############################
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
                            attributes: ["id","group_title", "group_url"],
                            through: Group_Users,
                            as: "group_user",
                        }, 
                        {
                            model: Event,
                            attributes: ["id","event_title"],
                            through: Event_Users,
                            as: "event_user"
                        },
                        {
                            model: User,
                            attributes: ["id","username"],
                            through: User_Friends,
                            as: "user_friends"
                        }
                    ]
                })

                return userData.map(item => item.get({plain: true}));
            }

            throw new AuthenticationError('You need to be logged in!')
        },
        users: async () => {
           return User.findAll({})
        },

        // ############################# Group Queries #############################
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
                        'group_url',
                        'group_text',
                        'group_zip',
                        [sequelize.literal('(SELECT COUNT(*) AS users_count FROM group_users WHERE group.id = group_users.group_id)'), 'users_count'],
                    ],
                    include: [
                        {
                            model: Event,
                            attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
                        }
                    ]
                })
                console.log(userData)

                return userData.map(item => item.get({plain: true}));
            }

            throw new AuthenticationError('You need to be logged in!')
        },
        groups: async () => {
            const groupData = await Group.findAll({
                attributes: [
                    'id',
                    'group_title',
                    'group_url',
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
            return groupData.map(item => item.get({plain: true}));
        },
        group: async (parent, { group_url }) => {
            const groupData =  await Group.findOne({
                where: {
                    group_url: group_url
                },
                attributes: [
                    'id',
                    'group_title',
                    'group_url',
                    'group_text',
                    'group_zip',
                    [sequelize.literal('(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)'), 'users_count'],
                ],
                include: [
                    {
                        model: Event,
                        attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
                    },
                    {
                        model: User,
                        attributes: ['id', 'first_name'],
                        through: Group_Users,
                        as: 'group_user'
                    }
                ]
            });

            return groupData.get({plain: true})
        },
        groupByZip: async (parent, { group_zip, miles }) => {
            let apiUrl = `https://www.zipcodeapi.com/rest/${process.env.ZIPRADIUSKEY}/radius.json/${group_zip}/${miles}/miles?minimal`;
            let intData = [];
             await axios.get(apiUrl).then((response) => {
                let zipArr = response.data.zip_codes
                intData = zipArr.map(zip_code => parseInt(zip_code))
                console.log(intData)
            }).catch(err => {
                console.log(err)
            });


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
                    'group_url',
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
            
            return data.map(item => item.get({plain: true}));
        }, 
        events: async (parent, args, context) => {
            if(context.user.id) {
                const data = await Event.findAll({})

                return data;
            }

            throw new AuthenticationError('You must be logged in!')
        },
        event: async (parent, { event_id }, context) => {
            if(context.user.id) {
                const data = await Event.findOne({
                    where: {
                        id: event_id
                    }
                })

                return data;
            }

            throw new AuthenticationError('You must be logged in!')
        },

        // Question queries
        questions: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Question.find(params).sort({ createdAt: -1 });
        },

        question: async (parent, { _id }) => {
            return Question.findOne({ _id });
        }
    }, 

        // ############################# Mutations #############################

    Mutation: {
        // ############################# User mutations #############################
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

        // ############################# Group mutations #############################
        createGroup: async (parent, { group_title, group_url, group_text, group_zip }, context) => {
            if(context.user.id) {
                const data = await Group.create({
                    group_title: group_title,
                    group_url: group_url,
                    group_text: group_text,
                    group_zip: group_zip,
                    user_id: context.user.id
                })
                
                return data;
            }

            throw new AuthenticationError('You need to be signed in!')
        }, 

        addUserGroup: async (parent, { group_id }, context) => {
            if(context.user.id) {
                const user_id = context.user.id;
                const data = await Group.addUser(group_id, user_id, { User, Group, Event, Group_Users })
                console.log(data)
                return data;
            }
            
            throw new AuthenticationError('You must be logged in@')
        },

        updateGroup: async (parent, { group_id, group_title, group_url, group_text, group_zip }, context) => {
            if(context.user.id) {
                const data = await Group.update(
                    {
                        group_title: group_title,
                        group_url: group_url,
                        group_text: group_text,
                        group_zip: group_zip
                    },
                    {
                        where: {
                            id: group_id
                        },
                        attributes: ['id', 'group_title', 'group_text', 'group_zip']
                    },
                )
                return data;
                
            }

            throw new AuthenticationError('You must be logged in!')
        }, 
        deleteGroup: async (parent, { group_id }, context) => {
            if(context.user.id) {
                const data = await Group.destroy({
                    where: {
                        id: group_id
                    }
                })

                console.log(data)
                return data;
            }

            throw new AuthenticationError('You must be logged in!')
        },
        createEvent: async (parent, { input }, context) => {
            if(context.user.id) {
                const data = await Event.create({
                    event_title: input.event_title,
                    event_text: input.event_text,
                    event_location: input.event_location,
                    event_time: input.event_time,
                    group_id: input.group_id
                })

                return data
            }
            
            throw new AuthenticationError('You must be logged in!')
        },

        addUserEvent: async (parent, { event_id }, context) => {
            if(context.user.id) {
                const user_id = context.user.id;
                const data = await Event.addUser(event_id, user_id, { User, Group, Event, Event_Users })

                return data
            }

            throw new AuthenticationError('You must be logged in!')
        }, 

        updateEvent: async (parent, { event_id, event_title, event_text, event_location, event_time }, context) => {
            if(context.user.id) {
                const data = await Event.update(
                    {
                        event_title: event_title, 
                        event_text: event_text, 
                        event_location: event_location,
                        event_time: event_time
                    },
                    {
                        where: {
                            id: event_id,
                        },
                        attributes: ["id", "event_title", "event_text", "event_location", "event_time"]
                    }
                )

                console.log(data);
                return data;
            }

            throw new AuthenticationError('You must be logged in!')
        },

        deleteEvent: async (parent, { event_id }, context) => {
            if(context.user.id) {
                const data = await Event.destroy({
                    where: {
                        id: event_id
                    }
                })

                return data;
            }

            throw new AuthenticationError('You must be logged in!')
        },

        // question and answer mutations
        addQuestion: async (parent, question_text, context) => {
            if(context.user) {
                const user_id = context.user.id;
                const question = await Question.create({
                    question_text: question_text,
                    user_id: user_id
                })
                
                return question.get({plain: true});;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },

        updateQuestion: async (parent, { question_id, question_text }, context) => {
            if(context.user.id) {
                const question = await Question.update(
                    {
                        question_text: question_text,  
                        user_id: context.user.id
                    },
                    {
                        where: {
                            id: question_id,
                        },
                        attributes: ["id", "question_text"]
                    }
                )

                return question;
            }

            throw new AuthenticationError('You must be logged in!')
        },

        deleteQuestion: async (parent, { question_id }, context) => {
            if(context.user.id) {
                const data = await Question.destroy({
                    where: {
                        id: question_id
                    }
                })

                return data;
            }

            throw new AuthenticationError('You must be logged in!')
        },

        addAnswer: async (parent, { input }, context) => {
            if(context.user.id) {
                const updatedQuestion = await Answer.create({
                    answer_text: input.answer_text,
                    user_id: context.user.id,
                    where: {
                        id: question_id,
                    },
                    attributes: ["id", "question_text", "user_id"]
                })

                return updatedQuestion.get({plain: true});
            }
            
            throw new AuthenticationError('You must be logged in!')
        },

        // Friend Mutations
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User_Friends.create({
                user_id: context.user.id,
                friend_id: friendId
            })
              return updatedUser.get({plain: true});
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;
