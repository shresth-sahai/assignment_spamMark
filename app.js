require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./config');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(port, () => {
  console.log("Running quickly");
});
