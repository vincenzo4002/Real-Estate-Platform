import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//protect
export const protect = async(req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({ 
                message: "Not authorized, no token",
                success: false
             });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");
        if(!req.user){
            return res.status(403).json({ 
                message: "Your account is blocked by an admin.",
                success: false
             });
        }
        next();
    } catch (err) {
        return res.status(401).json({ 
            message: "Token invalid",
            success: false
         });
    }
};

//role based aunthentication
export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
                return res.status(403).json({
                    message: "Access Denied.You do not have permission.",
                    success: false
                });
        }
        next();
    }
};