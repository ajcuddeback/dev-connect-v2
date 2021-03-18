const express = require("express");
const sequelize = require("./config/connection");
const httpsRedirect = require('express-https-redirect');
const app = express();

// We will probably not be using Express session. We will most likely use Passport.js for auth and creating sessions!
const session = require("express-session");
require("dotenv").config();
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
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use('/', httpsRedirect());

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
});
