const User = require("./User");
const Group = require("./Event_Models/Group");
const Event = require("./Event_Models/Event");
const Group_Users = require("./Event_Models/Group_User");
const Event_Users = require("./Event_Models/Event_User");
const Question = require("./Question_Models/Question");
const Answer = require("./Question_Models/Answer");
const QuestionTag = require("./Question_Models/QuestionTag");
const Tag = require("./Question_Models/Tag");
const Post = require("./Social_Models/Post");
const Comment = require("./Social_Models/Comment");
const Product = require("./Store_Models/Product");
const Category = require("./Store_Models/Category");
const TagItem = require("./Store_Models/Tag");
const ProductTag = require("./Store_Models/ProductTag");
const Items = require("./Store_Models/Items");
const Like = require("./Social_Models/Like")

// User to Group Associations
User.hasMany(Group, {
  foreignKey: "user_id",
});

Group.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Group, {
  through: Group_Users,
  as: "group_user",
  foreignKey: "user_id",
});

Group.belongsToMany(User, {
  through: Group_Users,
  as: "group_user",
  foreignKey: "group_id",
});

Group_Users.belongsTo(User, {
  foreignKey: "user_id",
});

Group_Users.belongsTo(Group, {
  foreignKey: "group_id",
});

User.hasMany(Group_Users, {
  foreignKey: "user_id",
});

Group.hasMany(Group_Users, {
  foreignKey: "group_id",
});

// User to Event associations
User.hasMany(Event, {
  foreignKey: "user_id",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Event, {
  through: Event_Users,
  as: "event_user",
  foreignKey: "user_id",
});

Event.belongsToMany(User, {
  through: Event_Users,
  as: "event_user",
  foreignKey: "event_id",
});

Event_Users.belongsTo(User, {
  foreignKey: "user_id",
});

Event_Users.belongsTo(Event, {
  foreignKey: "event_id",
});

User.hasMany(Event_Users, {
  foreignKey: "user_id",
});

Event.hasMany(Event_Users, {
  foreignKey: "event_id",
});

Event.belongsTo(Group, {
  foreignKey: "group_id",
});

Group.hasMany(Event, {
  foreignKey: "group_id",
});

// Question and Answer Associations
User.hasMany(Question, {
  foreignKey: "user_id",
});

Question.belongsTo(User, {
  foreignKey: "user_id",
});

Question.belongsToMany(Tag, {
  through: QuestionTag,
  as: "question_tags",
  foreignKey: "question_id",
});

Tag.belongsToMany(Question, {
  through: QuestionTag,
  as: "question_tags",
  foreignKey: "tag_id",
});

Answer.belongsTo(User, {
  foreignKey: "user_id",
});

Answer.belongsTo(Question, {
  foreignKey: "question_id",
});

User.hasMany(Answer, {
  foreignKey: "user_id",
});

Question.hasMany(Answer, {
  foreignKey: "question_id",
});

//create Posts and Likesassociations
User.hasMany(Post);

Post.belongsTo(User);

Comment.belongsTo(User);

Comment.belongsTo(Post);

User.hasMany(Comment);

Post.hasMany(Comment);


User.belongsToMany(Post, {
  through: Like,
  as: 'liked_posts',

  foreignKey: 'user_id',
  
});

Post.belongsToMany(User, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'post_id',
  
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
  
});

User.hasMany(Like, {
  foreignKey: 'user_id'
});

Post.hasMany(Like, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  
});
//End of Posts and Likes associations

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "product_tags",
  foreignKey: "product_id",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "product_tags",
  foreignKey: "tag_id",
});
User.hasMany(Items, {
  foreignKey: "user_id",
});

Product.hasMany(Items, {
  foreignKey: "product_id",
});

Items.belongsTo(Product, {
  foreignKey: "product_id",
});

Items.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Post,
  Comment,
  Group,
  Event,
  Group_Users,
  Event_Users,
  Product,
  Category,
  TagItem,
  ProductTag,
  Items,
  Question,
  Answer,
  QuestionTag,
  Tag,
};
