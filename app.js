const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');
//File System is a native module, therefore does not require installing, only requiring

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
//specifies the static folder where all the static files are stored
//they then refer relative to this folder ("public").  css/styles.css

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",

      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/571d2acbc0",
    method: "POST",
    "auth": {
      "user": "abc123",
      "pass": "684551b1529964a3c23a5606b1c0fbff-us4"
    },

    body: jsonData
    //commenting this will give http request status code 400
  };

  request(options, function(error, response, body) {
    if (error) {
      console.log("Error "+error);
      res.sendFile(__dirname+"/failure.html");

    } else {

      if (response.statusCode === 200)
      {
        console.log(response.statusCode);
        res.sendFile(__dirname+"/success.html");
      }
      else
      {
        console.log(response.statusCode);
        res.sendFile(__dirname+"/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
