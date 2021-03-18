const router = require('express').Router();
const { User, Group, Event, Event_Users } = require('../../../models');
const sequelize = require('../../../config/connection');
const withAuth = require('../../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Event.findAll({
        attributes: [
            'id',
            'event_title',
            'event_text',
            'event_location',
            'event_time',
            [sequelize.literal('(SELECT COUNT(*) FROM event_users WHERE event.id = event_users.event_id)'), 'users']
        ],
        include: [
            {
                model: Group,
                attributes: ['id', 'group_title', 'group_text', 'group_zip',],
            }
        ]
    })
        .then(dbeventData => res.json(dbeventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', withAuth, (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'event_title',
            'event_text',
            'event_location',
            'event_time',
            [sequelize.literal('(SELECT COUNT(*) FROM event_users WHERE event.id = event_users.event_id)'), 'users_count'],
        ],
        include: [
            {
                model: Group,
                attributes: ['id', 'group_title', 'group_text', 'group_zip',],
            }
        ]
    })
        .then(dbeventData => {
            if (!dbeventData) {
                res.status(404).json({ message: 'No Events found at this zip code!' });
                return;
            }

            res.json(dbeventData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', withAuth, (req, res) => {
    Event.create({
        event_title: req.body.event_title,
        event_text: req.body.event_text,
        event_location: req.body.event_location,
        event_time: req.body.event_time,
        group_id: req.body.group_id
    })
        .then(dbeventData => res.json(dbeventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/add-user', withAuth, (req, res) => {
    let user_id = req.session.user_id
    Event.addUser({ ...req.body }, user_id, { User, Group, Event, Event_Users })
        .then(updatedeventData => res.json(updatedeventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.put('/:id', withAuth, (req, res) => {
    Event.update(
        {
            event_title: req.body.event_title,
            event_text: req.body.event_text,
            event_location: req.body.event_location,
            event_time: req.body.event_time
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbeventData => {
            if (!dbeventData) {
                res.status(404).json({ message: "No event found at this id!" });
                return;
            }

            res.json(dbeventData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.delete('/:id', withAuth, (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbeventData => {
            if (!dbeventData) {
                res.status(404).json({ message: "No event found at this id!" });
                return;
            }

            res.json(dbeventData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;