const express = require("express");
const sequelize = require("./config/connection");
const httpsRedirect = require('express-https-redirect');
const app = express();


const stripe = require("stripe")(
  "sk_test_51IJ8N2AIilHitPQWlppuR9Z6W9SzOpgFUrWF2u11MP8yXHygvwx7KQHKeicjtGyAll96ZbZttrnjBIkZrIF37rpb00ozyEmmdj"
);
const helpers = require("./utils/helper");

const session = require("express-session");
require("dotenv").config();

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
// const stripe = require("stripe")(stripeSecretKey);

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: { httpOnly: false },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const routes = require("./controllers");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const PORT = process.env.PORT || 3002;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.use('/', httpsRedirect());

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
});
