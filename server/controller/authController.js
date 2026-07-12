import User from "../models/userModel.js";
import bcryptjs from "bcryptjs"
export const singup = async (req,res )=>{
    const {username, password, email} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword})
    try {
        await newUser.save();
        res.status(201).json("User created successfully")
    }catch (err){

    }

}