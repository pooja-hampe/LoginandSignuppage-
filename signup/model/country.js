const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name:{
      type:String
    }
});

module.exports = mongoose.model('Countries',countrySchema);