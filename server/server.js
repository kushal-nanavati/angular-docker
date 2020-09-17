const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const user = require("./config.json");
const mssql = require("mssql");
const app = express();
app.use(bodyParser.json());
app.use("/api",api);
app.get("/",(req,res)=>{
    res.send("Get request.");
});
let server = app.listen(user.serverPort,()=>{
    let port = server.address().port;
    console.log("Server is running on port:"+port);
});
