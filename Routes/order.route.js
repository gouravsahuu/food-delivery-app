const express = require("express");
const {OrderModel} = require("../Models/order.model");

const orderRoute = express.Router();

orderRoute.post("/orders",async(req,res) => {
    const {user,restaurant,items,totalPrice,deliveryAddress,status} = req.body;
    try{
        const newOrder = new OrderModel({user,restaurant,items,totalPrice,deliveryAddress,status});
        await newOrder.save();
        res.status(201).send({"message":"Order placed successfully"});
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

orderRoute.get("/orders/:id",async(req,res) => {
    const id = req.params.id;
    try{
        const data = await OrderModel.findById(id).populate(["user","restaurant"]);
        res.status(200).send(data);
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

orderRoute.patch("/orders/:id",async(req,res) => {
    const id = req.params.id;
    const {status} = req.body;
    try{
        const updateStatus = await OrderModel.findByIdAndUpdate(id,{status});
        res.status(204).send({"message":`Updated status for order ${id}`});
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

module.exports = {orderRoute};