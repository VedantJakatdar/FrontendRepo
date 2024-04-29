//Databse Connection for login page
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

app.use('/CSS', express.static(path.join(__dirname, '../CSS')));
app.use('/HTML', express.static(path.join(__dirname, '../HTML')));
app.use('/JavaScript', express.static(path.join(__dirname, '../JavaScript')));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Current-Root-Password",
    database: "users"
});

connection.connect(function(error){
    if(error) throw error
    else console.log("Connected to the database successfully");
})

app.get("/", function(req,res){
    const htmlPath = path.join(__dirname, '../HTML/login.html');
    res.sendFile(htmlPath);
})

app.post("/", encoder ,function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from userdetails where username = ? and password = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/HTML/homePage.html");
        } else {
            res.send('<script>alert("Wrong username or password"); window.location.href = "/";</script>');
        }
        res.end();
    })
})

app.get("../HTML/homePage.html",function(req,res){
    const htmlPath1 = path.join(__dirname, '../HTML/homePage.html');
    res.sendFile(htmlPath1);
})

app.listen(5500);