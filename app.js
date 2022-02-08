
const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const port = 3000;

app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }

      }
    ]

  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/f049a66418";
  const options = {
    method: "POST",
    auth: "fosahadal:85a7dad1bf719b78ea8caf0a0f1b4b7a-us14"

  }

  const request = https.request(url, options, function(response){
    if (response.statusCode == 200 )
      res.sendFile(__dirname + "/success.html");
    else
      res.sendFile(__dirname + "/failure.html");

      // response.on("data", function (data){
      //   console.log(JSON.parse(data));
      //});
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(port, function(){
  console.log("Server is running on port " + port );
});

// LIST_ID
// id=f049a66418
// API_KEY
// 85a7dad1bf719b78ea8caf0a0f1b4b7a-us14
