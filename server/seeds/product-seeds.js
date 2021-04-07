const { Product } = require("../models");

const products = [
  {
    product_name: "Branded T-Shirt in white",
    imgPath: "/images/White_TShirt.jpg",
    price: 30.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: "Branded Sweatshirt in white",
    imgPath: "/images/Sweatshirt.png",
    price: 50.99,
    stock: 22,
    category_id: 1,
  },
  {
    product_name: "Running Sneakers in white",
    imgPath: "/images/Running_sneakers.jpg",
    price: 90,
    stock: 25,
    category_id: 3,
  },
  {
    product_name: "Running Sneakers in black",
    imgPath: "/images/Running_sneaker.jpg",
    price: 90,
    stock: 25,
    category_id: 3,
  },

  {
    product_name: "Branded coffee mug white",
    imgPath: "/images/Coffee_Mug.jpg",
    price: 20.99,
    stock: 22,
    category_id: 2,
  },
  {
    product_name: "Branded water bottle white",
    imgPath: "/images/Water_Bottle.jpg",
    price: 10.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(products);

module.exports = seedProducts;
