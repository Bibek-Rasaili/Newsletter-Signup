const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

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

  console.log("Name: " + firstName + " " + lastName + "\n email " + email);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/571d2acbc0",
    method: "POST",
    "auth": {
      "user": "abc123",
      "pass": "684551b1529964a3c23a5606b1c0fbff-us4"
    },

    // body: jsonData
  };


  request(options, function(error, response, body) {
    if (error) {
      console.log("There is an error " + error);
      res.sendFile(__dirname+"/failure.html");

    } else {
      console.log(response.statusCode);
      if (response.statusCode === 200)
        res.sendFile(__dirname+"/success.html");
      else
        res.sendFile(__dirname+"/failure.html");
    }

  });
});


app.get("/success", function(req, res) {
  res.sendFile(__dirname + "/success.html");
});

app.get("/failure", function(req, res) {
  res.sendFile(__dirname + "/failure.html");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});


// 684551b1529964a3c23a5606b1c0fbff-us4

// 571d2acbc0
// 571d2acbc0
