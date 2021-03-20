const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const user = require("../config.json");
const users = require("../models/users.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const NodeRSA = require("node-rsa");
const base64 = require("base64url");
const fs = require("fs");
const bcrypt = require("bcrypt")
const app = express();
const saltRounds = 10;
const ACCESS_TOKEN_SECRET="52864cc4c2f2d94ddd179efdbd455baac411a06f8ab664392680baffc84f156733021d7a97e545c1cde7dfc0cb73feea0100be2735743205b78ac7e324cea66a";
let payload = {};

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var conn = new mssql.ConnectionPool(user.dbConfig);
function getUserDetailsObj(req){
    var user_obj = {
        email:req.body.EmailID,
        username:req.body.Username,
        phone:req.body.Phone_Number,
        addr:req.body.Address,
        password:req.body.Password
    } 
    return user_obj;
}
router.get("/",(req,res)=>{
    res.send("From API route.");
});
router.options("/register",cors());
router.post("/register",cors(),(req,res)=>{
    let user_obj={};
    user_obj = getUserDetailsObj(req);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user_obj.password, salt);
    console.log(hash);
    let json1 = {
        EmailID:user_obj.email,
        Username:user_obj.username,
        Phone_Number:user_obj.phone,
        Address:user_obj.addr,
        Password:hash
    };
    let json = JSON.stringify(json1);
    console.log(user_obj.username);
    ConnectToDB((request)=>{
        console.log(request);
        request.input("Usrname",mssql.VarChar(20),json1.Username);
        request.execute("GetExistingUsers2").then((result)=>{
            console.log(result.recordset.length);
            if(result.recordset.length!=0){
                console.log("Inside if");
                res.sendStatus(409).json({message:"*User already exists..."});
            }
            else{
                ConnectToDB((request)=>{
                    request.input("InsertJSON",mssql.NVarChar("max"),json);
                    request.execute("InsertUsers17").then((registeredUser)=>{
                    console.log("Executed SP.");
                    res.sendStatus(200).json({message:"User added successfully.."});
                });
            });    
        }
    });
});       
});
router.options("/login",cors());
router.post("/login", cors(), (req,res)=>{
    console.log("Login API.");               
    let password = req.body.Password;
    let tokenStr = req.body.Token;  
    console.log("Token is:-",tokenStr);      
    let status = validateUsers(req,res,(status)=>{
        console.log(status);
        if(status){                         //true, so user is authenticated.            
            payload = {
                "Username":req.body.Username
            };
            
            console.log("Payload is:-"+payload.Username);                
            if(tokenStr !== undefined){
                console.log("TokenStr payload is:-",tokenStr.split(".")[1]!=payload.Username);            
            }            
            if(tokenStr === undefined || tokenStr.split(".")[1]!=payload.Username){
                                        
                    let newToken = jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:'30s'});                                                
                    console.log(newToken);
                    res.status(200).json({encryptedToken:newToken});                    
                }else{
                    jwt.verify(tokenStr,ACCESS_TOKEN_SECRET,(err,user)=>{
                        if(err){                                                     
                            console.log(err);                            
                        }else{
                            console.log("Authorized user is:-"+user);                            
                        }
                    });
                }            
         }
         else{
            console.log("Status is:-"+status);             
            res.status(404).json({encryptedToken:"Unauthenticated user..."});
        }             
    });
});     
                   
function validateUsers(req,res,cb){
    let status = false;
    ConnectToDB((request2)=>{
        request2.input("Usrname",mssql.VarChar(20),req.body.Username);
        request2.execute("GetExistingUsers2").then((result)=>{
            console.log(result.recordset[0].Passwd);            
            bcrypt.compare(req.body.Password,result.recordset[0].Passwd,(err,result)=>{
                if(result){
                    status=true;
                    cb(status);                    
                }else{
                    cb(status);
                }
            });
        });
    });
}
function ConnectToDB(cb) {
    conn.connect().then((conn)=>{
        var request = new mssql.Request(conn);
        cb(request);  
    }).catch({

    });
}
module.exports=router;
