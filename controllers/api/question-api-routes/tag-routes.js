const router = require('express').Router();
const { Tag, Question, QuestionTag } = require('../../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Question,
        attributes: ['id', 'question_text'],
        through: QuestionTag,
        as: 'question_tags'
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Unable to locate any tags' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err => {
        console.log(err);
        res.status(505).json(err);
      });
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Question,
        attributes: ['id', 'question_text'],
        through: QuestionTag,
        as: 'question_tags'
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Unable to find a tag with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Unable to locate a Tag with this id' });
        return;
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Unable to locate a tag with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;