const { Category } = require("../models");

const categoryData = [
  {
    category_name: "Clothing",
  },
  {
    category_name: "Other",
  },

  {
    category_name: "Shoes",
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
