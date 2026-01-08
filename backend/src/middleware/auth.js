import User from "../model/user";
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {

    }catch(err){
        res.status(401).json({ message: "Unauthorized" });
    }
}