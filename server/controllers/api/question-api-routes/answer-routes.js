const router = require('express').Router();
const { Answer } = require('../../../models');

router.get('/', (req, res) => {
    Answer.findAll({})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    
    if (req.session) {
      Answer.create({
        answer_text: req.body.answer_text,
        question_id: req.body.question_id,
        user_id: req.session.user_id
    
      })
        .then(dbAnswerData => res.json(dbAnswerData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
});

router.delete('/:id', (req, res) => {
    Answer.destroy({
        where: {
          id: req.params.id,
        },
    })
    .then((dbQuestionData) => {
        if (!dbQuestionData) {
            res.status(404).json({ message: "Unable to locate a question with this id" });
            return;
        }
        res.json(dbQuestionData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;