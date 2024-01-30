const express=require("express");
const mongoose=require("mongoose");
const bodyParser= require("body-parser");
const dotenv=require("dotenv");
const path=require('path');


const app=express();
dotenv.config();

const signupPage=(path.join(__dirname,"../public"));
console.log(signupPage);
app.use(express.static(signupPage));

const port =process.env.PORT || 3000;


mongoose.connect=("mongodb+srv://rupejavansh:rupejavansh2002@cluster0.db6xhz9.mongodb.net/registrationFormDB",{
    useNewUrlParser : true,useUnifiedTopoLogy:true,useCreateIndex: true,serverSelectionTimeoutMS: 5000
});

    


const registrationSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const Registration= mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "./public/index.html");

})
app.post("/register",(req, res) =>{
    try{
        const{name, email, password} = (req.body);
        const existingUser= Registration.findOne({name:name});
            const registrationData =new Registration({
                name,
                email,
                password
            });
            registrationData.save();
            res.redirect("success");
        }
        catch (error){
            console.log(error);
            res.redirect("error");
        }
});

app.get("/success",(req,res)=>
{
    res.sendFile((path.join(__dirname,"../public/success.html")));

})
app.get("/error",(req,res)=>{
    res.sendFile((path.join(__dirname,"../public/error.html")));
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);

});