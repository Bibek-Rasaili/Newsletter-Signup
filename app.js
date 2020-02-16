const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
