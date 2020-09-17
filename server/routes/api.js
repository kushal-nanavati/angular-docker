const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const user = require("../config.json");
const users = require("../models/users.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(session({secret:"It's a secret.",saveUninitialized:true,resave:true}));
var conn = new mssql.ConnectionPool(user.dbConfig);
router.get("/",(req,res)=>{
    res.send("From API route.");
});
router.options("/register",cors());
router.post("/register",cors(),(req,res)=>{
    var email = req.body.EmailID;
    var username = req.body.Username;
    var phone = req.body.Phone_Number;
    var addr = req.body.Address;
    var password = req.body.Password;
    console.log(username);
    conn.connect().then((conn)=>{
        var request = new mssql.Request(conn);    
        let json = JSON.stringify(req.body);
        let jsonObject = JSON.parse(json);
        let newString = JSON.stringify(jsonObject);
        request.input("EmailID",mssql.VarChar(50),email);
        request.execute("GetAllNewUsers1").then((result)=>{
            console.log(result.recordset.length);
            if(result.recordset.length!=0){
                console.log("Inside if");
                res.status(409).json({message:"User already exists..."});
            }
            else{
                var request1 = new mssql.Request(conn);
                console.log(newString);
                request1.input("InsertJSON",mssql.NVarChar("max"),newString);
                request1.execute("InsertUsers13").then((registeredUser)=>{
                console.log("Executed SP.");
                // let payload = {subject:registeredUser.ID};
                // let token = jwt.sign(payload,"secretKey");
                // res.status(200).json({token});
                res.status(200).json({message:"User added successfully.."});
                });
            }
        });
    });
});
var sessionData;
router.options("/login",cors());
router.post("/login",cors(),(req,res)=>{
    let json=JSON.stringify(req.body);
    let jsonObject=JSON.parse(json);
    let newString=JSON.stringify(jsonObject);
    conn.connect().then((conn)=>{
        var request2= new mssql.Request(conn);
        request2.input("GetJSON",mssql.NVarChar("max"),newString);
        request2.execute("GetExistingUsers").then((result)=>{
            if(result.recordset.length){
                users.Username=req.body.Username;
                console.log(users.Username);
                sessionData=req.session;
                sessionData=users.Username;
                console.log(sessionData);
                // let payload = {subject:result.recordset.ID};
                // let token = jwt.sign(payload, "secretKey");
                // res.status(200).json({token});
                res.status(200).json({message:sessionData});
                // res.status(200).send(sessionData);
            }else{
                res.status(404).json({message:"*User not found..."});
            }
        });
    });
});
module.exports=router;
