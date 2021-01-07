//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));  //specifies a static folder in order to pull in the CSS and images.



app.get ("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req, res){

   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;

   const data = {
     members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
   };

  const jsonData = JSON.stringify(data);

  const  url = "https://us2.api.mailchimp.com/3.0/lists/9d298f2c61";

  const options = {
    method: "POST",
    auth: "dawson1:ff08d88f5be6c8d2070fa6241fa4f2eb-us2"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

request.write(jsonData);
request.end();
});




app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});


//API Key
//ff08d88f5be6c8d2070fa6241fa4f2eb-us2

//List ID
//9d298f2c61
