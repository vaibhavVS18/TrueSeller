import userModel from "../models/user.model.js";

export const createUser = async({email, password})=>{
    if(!email || !password){
        throw new Error("Email and password are required");
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password: hashedPassword
    });
    return user;
}


export const loginUser = async({email, password})=>{
    if(!email || !password){
        throw new Error("Email and password are required");
    }

    const user = await userModel.findOne({email});
    if(!user){
        throw new Error("user not found");
    }

    const isMatch = await user.isValidPassword(password);
    if(!isMatch){
        throw new Error("Invalid credentials");
    }
    
    return user;
}