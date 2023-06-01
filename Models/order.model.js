const mongoose = require("mongoose");
const {ResModel} = require("./restaurant.model");
const {UserModel} = require("./user.model");

const orderSchema = mongoose.Schema({
    user : { type: mongoose.ObjectId, ref: UserModel },
    restaurant : { type: mongoose.ObjectId, ref: ResModel },
    items: [{
        name: String,
        price: Number,
        quantity: Number
      }],
    totalPrice: {type:Number,required:true},
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
    status: {type:String,required:true}
});

const OrderModel = mongoose.model("order",orderSchema);

module.exports = {OrderModel};