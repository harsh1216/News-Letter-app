const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const eMail = req.body.eMail;

  mailchimp.setConfig({
    apiKey: "c8f23f92fc402d91c34ea3d39d72602c-us21",
    server: "us21"
  });

  const listId = "31d6ff1d1a";
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: eMail
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    console.log(res.statusCode);
    console.log("Successfully added contact as an audience member. The contact's id is" + response.id);
  }
  if (res.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }

  run();
})









app.listen(process.env.PORT ||3000, function() {
  console.log("this server is avtive on port 3000");
})


// Api key : c8f23f92fc402d91c34ea3d39d72602c-us21
// audiance id : 31d6ff1d1a
