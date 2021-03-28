const router = require("express").Router();
const { Items, User, Product } = require("../../../models");
// const withAuth = require("../../../utils/auth");

router.get("/", (req, res) => {
  Items.findAll({})
    .then((dbItemsData) => res.json(dbItemsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Items.create({
    qauntity: req.body.qauntity,
    user_id: req.session.user_id,
    // user_id: req.body.user_id,
    product_id: req.body.product_id,
  })
    .then((dbItemsData) => res.json(dbItemsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Items.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbItemsData) => {
      if (!dbItemsData) {
        res.status(404).json({ message: "No items found at this id" });
        return;
      }

      res.json(dbItemsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
