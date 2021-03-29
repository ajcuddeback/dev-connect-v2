// resolvers
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
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
                            attributes: ["id", "group_title", "group_text", "group_zip"],
                        },
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
        }
    }, 
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)

            const token = signToken(user);

            return { token, user }
        }, 
        login: async (paren, {username, password}) => {
            const user = User.findOne({
                where: {
                    username: username
                }
            });

            if(!user) {
                throw new AuthenticationError('Incorrect Credentials!')
            };

            console.log(user)

            const correctPw = (await user).checkPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Credentials!')
            }

            const token = signToken(user);

            return { token, user };
        }
    }
}

module.exports = resolvers;
