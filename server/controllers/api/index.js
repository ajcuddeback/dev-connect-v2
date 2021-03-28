const router = require("express").Router();

const userRoutes = require('./user-routes');
const groupRoutes = require('./event-api-routes/group-routes');
const eventRoutes = require('./event-api-routes/event-routes');
const storeRoutes = require("./store-api-routes/");
const questionRoutes = require('./question-api-routes/question-routes');
const answerRoutes = require('./question-api-routes/answer-routes');
const tagRoutes = require('./question-api-routes/tag-routes');
const socialUserRoutes = require('./home-api-routes/social-user-routes');
const postRoutes = require('./home-api-routes/post-routes');
const commentRoutes = require('./home-api-routes/comment-routes');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/events', eventRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);
router.use('/tags', tagRoutes);
router.use("/store", storeRoutes);

//add social routes to index
router.use('/comments', commentRoutes);
router.use('/users', socialUserRoutes);
router.use('/posts', postRoutes);


module.exports = router;
