const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");
const userController = Router();
require("dotenv").config()

userController.post("/signup", async(req,res) => {
    const {email , password , age} = req.body;

    bcrypt.hash(password , 6 , async function(err,hash){
        if(err){
            res.send("Plz try again later, something went wrong");
        }
        const user = await UserModel.create({
            email,
            password : hash,
            age  
        })
        await user.save()
        res.json({message: "Signup Successfully"})
    })
})

userController.post("/login", async(req,res)=>{
    const {email , password} = req.body;
    const user = await UserModel.findOne({email});
    const hash = user.password;
    bcrypt.compare(password , hash , async function(err , result){
        if(err){
            res.send("Plz try again later, something went wrong");
        }
        if(result){
            const token = jwt.sign({userId: user._id} , process.env.SECRET);
            res.json({message: "Login Successfully", token});
        }
        else{
            res.send("Invalid credentials, plz signup if you haven't")
        }
    })
})

module.exports = {
    userController
}