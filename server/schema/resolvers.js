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
    }
}

module.exports = resolvers;
