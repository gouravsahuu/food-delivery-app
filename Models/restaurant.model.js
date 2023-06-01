const mongoose = require("mongoose");

const resSchema = mongoose.Schema({
    name: {type:String,required:true},
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
      name: String,
      description: String,
      price: Number,
      image: String
    }]
  })

const ResModel = mongoose.model("restaurant",resSchema);

module.exports = {ResModel};