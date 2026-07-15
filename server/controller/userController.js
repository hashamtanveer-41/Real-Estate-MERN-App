import {errorHandler} from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js"
export const updateUser =async (req, res) => {
    if (req.user.id !== req.params.id) return next(errorHandler(403, "You can update only your account!"));
    try{
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar
            }
        }, {new: true})
        const {password , ...rest} = updateUser._doc;
        res.status(200).json(rest)
    }catch (err){
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(403, "You can delete only your account!"));
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({success: true, message: "User has been deleted successfully!"});
    }catch (err){
        next(err);
    }
}