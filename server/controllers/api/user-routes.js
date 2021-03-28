const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  User,
  Group,
  Group_Users,
  Event,
  Event_Users,
} = require("../../models");
const fetch = require("node-fetch");
require("dotenv").config();

router.get("/", (req, res) => {
  User.findAll({})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
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
        as: "event_user",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id!" });
        return;
      }

      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  })
    .then((dbUserData) => {
      const apiUrl =
        "https://us1.locationiq.com/v1/reverse.php?key=" +
        process.env.GEOAPIKEY +
        "&lat=" +
        req.body.lat +
        "&lon=" +
        req.body.lon +
        "&format=json";
      fetch(apiUrl).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;
              req.session.zip = data.address.postcode;
              res.json(dbUserData);
            });
          });
        }
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found at this username" });
        return;
      }

      const validatePassword = dbUserData.checkPassword(req.body.password);

      if (!validatePassword) {
        res.status(400).json({ message: "Incorrect password" });
        return;
      }

      const apiUrl =
        "https://us1.locationiq.com/v1/reverse.php?key=" +
        process.env.GEOAPIKEY +
        "&lat=" +
        req.body.lat +
        "&lon=" +
        req.body.lon +
        "&format=json";
      fetch(apiUrl).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;
              req.session.zip = data.address.postcode;
              res.json(dbUserData);
            });
          });
        }
      });
      console.log(req.session);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id!" });
        return;
      }

      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id" });
        return;
      }

      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
