const express = require("express");
const employeedb = require("../models/employee");


const router = express.Router();

module.exports = function (passport) {

    router.use(passport.authenticate("auth", {session :false}), (req, res, next)=>{
        next();
    })

    router.get("/", (req, res) => {

        employeedb.find({}, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.json(result)
            }
        });
    });
    
    router.get("/:id", (req, res) => {
    
        employeedb.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.json(result)
            }
        })
    });
    
    router.post("/", (req, res) => {
    
        if (!req.files.profilePict) {
            return res.status(400).send("No files were uploaded");
        }
    
        let image = req.files.profilePict;
    
        let ext = image.name.split(".");
        let extLast = ext[ext.length - 1]
    
        let imageName = Date.now() + "." + extLast
    
        image.mv("./public/profile/" + imageName, (error) => {
            if (error) return res.status(500).send(error);
    
            let newObj = new employeedb({
                name: req.body.name,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                salary: req.body.salary,
                profilePict: "http://localhost:3000/profile/" + imageName
            });
    
            newObj.save((error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.json(newObj);
                }
            });
        });
    });
    
    router.delete("/:id", (req, res) => {
    
        employeedb.findByIdAndRemove(req.params.id, (error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send({ message: "Data deleted" })
            }
        })
    });
    
    router.put("/", (req, res) => {
    
        let newObj = {
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            salary: req.body.salary
        };
    
        employeedb.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result)
            }
        })
    });

    return router;
};


