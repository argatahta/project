const express = require("express");
const userdb = require("../models/user");

const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup",(req, res)=>{

    let newObj = new userdb({
        username :  req.body.username,
        password :  req.body.password
    })

    newObj.save((error)=>{
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(newObj);
        }
    })
});

router.post("/login", (req, res)=>{

    userdb.findOne({username : req.body.username, password:req.body.password},(error, result)=>{
        if (error) {
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({message: "User not found !"})
        }
        else{
            const payload={
                id: result._id,
                name: result.username
            }
            const token = jwt.sign(payload, "secretkey", {expiresIn: 1000 })
            res.json({token: token})
        }
    })
});

module.exports = (function () {
    return router;
})();

