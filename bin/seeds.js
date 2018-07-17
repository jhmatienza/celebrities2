const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');

const celebrities = require('../data/celebrities.data');

require('../configs/db.config');

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.error(`Seeded ${celebrities.length} celebrities properly`);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  });
