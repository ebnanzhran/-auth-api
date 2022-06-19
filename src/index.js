'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./api/models/clothes/model.js');
const foodModel = require('./api/models/food/model.js');
const Collection = require('./api/models/data-collection.js');
const userModel = require('./auth/models/users.js');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {};

const sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes)
};