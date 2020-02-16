const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
//specifies the static folder where all the static files are stored
//they then refer relative to this folder ("public").  css/styles.css

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
