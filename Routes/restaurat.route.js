const express = require("express");
const {ResModel} = require("../Models/restaurant.model");

const resRoute = express.Router();

resRoute.get("/restaurants",async(req,res) => {
    try{
        const allRes = await ResModel.find();
        res.status(200).send(allRes);
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

resRoute.get("/restaurants/:id",async (req,res) => {
    const id = req.params.id;
    try{
        const oneRes = await ResModel.findById(id);
        res.status(200).send(oneRes);
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

resRoute.get("/restaurants/:id/menu",async (req,res) => {
    const id = req.params.id;
    try{
        const data = await ResModel.findById(id);
        res.status(200).send(data.menu);
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

resRoute.post("/restaurants",async (req,res) => {
    const {name,address,menu} = req.body;
    try{
        const newRes = new ResModel({name,address,menu});
        await newRes.save();
        res.status(201).send({"message":"Restaurant added successfully"});
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

resRoute.put("/restaurants/:id/menu", async (req,res) => {
    const id = req.params.id;
    const {menu} = req.body;
    try{
        const resData = await ResModel.findById(id);
        if(resData){
            resData.menu.push(menu);
            const data = await ResModel.findByIdAndUpdate(id,{menu : resData.menu});
            res.status(201).send({"message":"Menu item added successfully"});
        }
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

resRoute.delete("/restaurants/:resid/menu/:menuid", async (req,res) => {
    const {resid,menuid} = req.params;
    try{
        const data = await ResModel.findById(resid);
        if(data){
            const arr = data.menu;
            for(let i=0;i<arr.length;i++){
                if(arr[i]._id == menuid){
                    arr.splice(i,1);
                }
            }
            await ResModel.findByIdAndUpdate(resid,data);
            res.status(202).send({"message":"Menu item deleted successfully"});
        }
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

module.exports = {resRoute};