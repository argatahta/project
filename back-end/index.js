const express = require("express");
const fileUpload = require("express-fileupload");

const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

const employeeRoutes = require("./routes/employee");
const userRoutes = require("./routes/user")

const app = express();

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT,PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());
app.use(express.static('public'))
app.use(passport.initialize());

//cara upload = postman post - body - formdata - key=image-dropdown=file
//di headers value=multipart/formdata

//express.static = POST localhost:3000/image.png 

// app.post("/upload",(req, res)=>{

//     if(!req.files.profile){
//         return res.statusCode(400).send("No files were uploaded");
//     }

//     let image = req.files.profile;

//     let ext = image.name.split(".");
//     let extLast = ext[ext.length - 1]

//     let imageName = Date.now()+"."+extLast

//     image.mv("./public/profile/" + imageName, (error) =>{
//         if(error) return res.status(500).send(error);

//         // res.send("Upload Success !")
//         res.json({ path: "http://localhost:3000/"+ imageName});
//     });
// });

passport.use("auth", new BearerStrategy((token, done)=>{
    // if(token == "1234"){
    //     return done(null, {name :"user 1"});
    // }
    // else{
    //     return done("user not authorized",null);
    // }
    jwt.verify(token, "secretkey", (error, decoded)=>{
        if(error){
            return done(error, null)
        }else{
            console.log(decoded);
            return done(null,decoded);
        }
    });
}));

app.post("/api/validatetoken", passport.authenticate("auth", {session:false}), (req,res)=>{
    res.send(req.user);
})

// app.post("/data", passport.authenticate("auth", {session :false}), (req, res)=>{
//     // res.send("berhasil")
//     res.json(req.user);
// });

// app.post("/login", (req,res)=>{
//     if(req.body.username == "user" && req.body.password == "abc123"){

//         const payload ={
//             id :"USR10012018",
//             name : "user"
//         }
//         const token = jwt.sign(payload, "secretkey", {expiresIn:1000});

//         res.json({token: token});
//     }else{
//         res.status(404).json({message:"User not found !"});
//     }
// });

app.use("/api/user", userRoutes);
app.use("/api/employee", employeeRoutes(passport));

app.listen(3000, ()=>{
    console.log("connecting...")
});