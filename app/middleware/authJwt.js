const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (req, isAdmin) => {
    try{
        let token = req.get("Authorization");

    if (!token) {
    const error = new Error("No Token")
    error.statusCode = 401;
    throw error;
    }

    jwt.verify(token, config.accessSecret, (err, decoded) => {
    if (err) {
        const error = new Error("Error Token")
        error.statusCode = 401;
        throw error; 
    }

    req.userId = decoded.id;
    if(isAdmin&&!decoded.isAdmin){
    const error = new Error("not Allowed")
    error.statusCode = 401;
    throw error; 
    }  
    return req;
  });
    }catch(err){
        return err
    }
         
};


exports.authenticateAdmin = async (req ,res , next) => {
    try{
    const validate = verifyToken(req , true);
    if(!(validate instanceof Error)){
        next();
    }else{
        throw validate
    }

    }catch(err){
        console.log(err)
        res.status(err.statusCode).send({
            message : err.message
      })
    }
};
  
exports.authenticateUser = async (req ,res , next) => {
    try{
    const validate = verifyToken(req , false);
    if(!(validate instanceof Error)){
        next();
    }else{
        throw validate
    }

    }catch(err){
        console.log(err)
        res.status(err.statusCode).send({
            message : err.message
      })
    }
}

// exports.getUserIdByToken = (req, res, next) => {
//     let token = req.headers["Authorization"];
  
//     if (!token) {
//       return res.status(204).send({
//         message: "No token provided!"
//       });
//     }
  
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         return res.status(204).send({
//           message: "Unauthorized!"
//         });
//       }
//       req.userId = decoded.id;
//       res.status(200).send(req.userId)
//     });
//   };



