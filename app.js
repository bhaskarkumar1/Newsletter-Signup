const express= require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
const request=require("request");
const { response } = require("express");
const { post } = require("request");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
const port =3000;



app.get("/", function(req, res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
    const firstName=req.body.firstName;
   const lastName=req.body.lastName;
    const email=req.body.email;

const  data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    console.log(firstName);

console.log(email);
const jsonData=JSON.stringify(data);
const url= "https://us21.api.mailchimp.com/3.0/lists/57dc400fee";
const options={
    method:"POST",
    auth:"bhaskarkumar:c122f7f2de35c90090403b2e1a4fda49-us21"

}
const request= https.request(url,options,function(response){
    // console.log(response);
    if(response.statusCode===200){
        // res.send("Subscription added ");
        res.sendFile(__dirname+"/success.html");

    }else{
        // res.send("Error");
        res.sendFile(__dirname+"/failure.html");


    }
response.on("data",function(data){
    // console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();

});
app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || port,function(){
console.log("Server is running on Port:3000 ");
});

// c122f7f2de35c90090403b2e1a4fda49-us21
// 57dc400fee