const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../Models/user.model"); 

const userRoute = express.Router();

userRoute.post("/register",async(req,res) => {
    const {name,email,password,address} = req.body;
    try{
        const existingUser = await UserModel.find({email});
        if(existingUser.length == 0){
            bcrypt.hash(password, 5, async (err,hash)=> {
                if(err){
                    res.status(400).send({"message":err.message});
                }
                else{
                    const user = new UserModel({name,email,address,password : hash});
                    await user.save();
                    res.status(201).send({"message":"User Registered Successfully"});
                }
            })
        }
        else{
            res.status(400).send({"message":"User already exists"});
        }
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

userRoute.post("/login",async(req,res) => {
    const {email,password} = req.body;
    try{
        const findUser = await UserModel.find({email});
        if(findUser.length > 0){
            bcrypt.compare(password, findUser[0].password, (err,result) => {
                if(result == true){
                    const token = jwt.sign({userID : findUser._id}, process.env.key, { expiresIn: '1h' });
                    res.status(201).send({"message":"Login success","token":token});
                }
                else if(result == false){
                    res.status(400).send({"message":"Wrong Credentials"});
                }
            })
        }
        else{
            res.status(400).send({"message":"User not registered"});
        }
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

userRoute.patch("/user/:id/reset",async(req,res) => {
    const id = req.params.id;
    const {password} = req.body;
    try{
        const findUser = await UserModel.findById(id);
        if(findUser){
            bcrypt.hash(password, 5, async (err,hash) => {
                if(err){
                    res.status(400).send({"message":err.message});
                }
                else{
                    const changePass = await UserModel.findByIdAndUpdate(id, {password : hash});
                    res.status(204).send({"message":"Password reset success"});
                }
            })
        }
        else{
            res.status(400).send({"message":"User not registered"});
        }
    }
    catch(err){
        res.status(400).send({"message":"Something went wrong","error":err.message});
    }
})

module.exports = {userRoute};