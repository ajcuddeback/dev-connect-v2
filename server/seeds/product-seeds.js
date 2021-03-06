const { Product } = require("../models");

const products = [
  {
    product_name: "Branded T-Shirt in white",
    imgPath: "White_TShirt.jpg",
    price: 30.99,
    quantity: 14,
    category_id: 1,
  },
  {
    product_name: "Branded Sweatshirt in white",
    imgPath: "Sweatshirt.png",
    price: 50.99,
    quantity: 22,
    category_id: 1,
  },
  {
    product_name: "Running Sneakers in white",
    imgPath: "Running_sneakers.jpg",
    price: 90,
    quantity: 25,
    category_id: 3,
  },
  {
    product_name: "Running Sneakers in black",
    imgPath: "Running_sneaker.jpg",
    price: 90,
    quantity: 25,
    category_id: 3,
  },

  {
    product_name: "Branded coffee mug white",
    imgPath: "Coffee_Mug.jpg",
    price: 20.99,
    quantity: 22,
    category_id: 2,
  },
  {
    product_name: "Branded water bottle white",
    imgPath: "Water_Bottle.jpg",
    price: 10.99,
    quantity: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(products);

module.exports = seedProducts;