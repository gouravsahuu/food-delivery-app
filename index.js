const express = require("express");
require("dotenv").config();
const port = process.env.port;
const {connection} = require("./Configs/db");
const {userRoute} = require("./Routes/user.route");
const {resRoute} = require("./Routes/restaurat.route");
const {orderRoute} = require("./Routes/order.route");
const app = express();

app.use(express.json());

app.use("/api",userRoute);
app.use("/api",resRoute);
app.use("/api",orderRoute);

app.get("/",(req,res) => {
    res.status(200).send({"message":"Welcome to backend server for Food Delivery"});
})

app.listen(port,async () => {
    try{
        await connection;
        console.log("Connected to Database");
        console.log(`Server is running at port ${port}`);
    }
    catch(err){
        console.log(err.message);
    }
})