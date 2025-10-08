import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js"
import userModel from "../models/user.model.js";
import redisClient from "../services/redis.service.js";


export const createUserController = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();

        delete user._doc.password;
        res.status(201).json({user, token});
    }
    catch(err){
        res.status(400).send(err.message);
    }
}


export const loginUserController = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({erroes: errors.array()});
    }

    try{
        const user = await userService.loginUser(req.body);
        const token = await user.generateJWT();

        return res.status(200).json({user, token});
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

export const ProfileController = async(req, res)=>{
    try{
        const email = req.user.email;
        const user = await userModel.findOne({email});

        delete user._doc.password;
        res.status(200).json({user: user});
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

export const logoutController = async(req, res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        redisClient.set(token, "logout", "EX", 60*60*24);
        
        res.status(200).json({
            message: "logged out successfully"
        });
    }
    catch(err){
        res.status(400).send(err.message);
    }
}
