const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser" , {extended: true})
const path = require('path');
const User = require('../models/user.module')
app.use(cookieParser())
app.use(bodyParser())
const jwt = require("jsonwebtoken")
const fs = require('fs');
const PatientModel = require('../models/patient.module');
const { getPersonDetail } = require('./utils/getPersonDetail');
const ReviewModel = require('../models/reviews.module');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index")
})
app.post("/newReview" ,async  function (req , res , next){
    const decodedData = getPersonDetail();
    const patient = PatientModel.findById(decodedData.id);
    const review = await ReviewModel.create({
        name : patient.name,
        email : patient.email,
        description: req.body.description,
        rating : req.body.rating
    })

})

app.get('/about', function (req, res) {
    res.render("About")
})



app.get('/contact', function (req, res) {
    res.render("Contact")
})



app.get('/BookSession', function (req, res) {



    res.render("BookSession")
})



app.get('/profile', async function (req, res) {

    const { token } = req.cookies;

    const decodedData = await jwt.verify(token, "wlrng;ksfb kfvj sfugbRWUOBVOSV");

    const user = await User.findById(decodedData.id);

    res.render("Profile", { user })
})

app.get('/patientProfile', async function (req, res) {
    const decodedData = getPersonDetail();
    const patient = await PatientModel.findById(decodedData.id);
    res.render("PatientProfile" , {patient})

})
app.post('/patientRegister', async function (req, res) {
    if(req.isPatient){
        const { name, age, email } = req.body;
    const patient = await PatientModel.create({
        name, email, password, age
    })

    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(200).cookie('token', token, options).json({
        success: true
    })

    req.isPatient = true;

    res.render("medicalhistory", { patient })}
})

app.get("/community" , (req , res , next)=>{
    res.render("Community")
})
app.post('/addMedics', async function (req, res) {
    if (req.isPatient) {

        const decodedData = getPersonDetail();
        const patient = await PatientModel.findById(decodedData.id);

        patient.medicalHistory.push({
            disease: req.body.disease,
            year: req.body.year,
            doctor: {
                name: req.body.Docname,
                Location: req.body.Location
            }
        })

        patient.save()

        res.render("medicalHistory", { patient })

    }
    else {
        res.redirect("/userProfile")
    }
})
app.get("/connect",function(req,res){
res.render("Connect")
})



app.post('/register', async function (req, res) {

    const { name, email, password, age } = req.body;

    const user = await User.create({
        name, email, password, age
    })

    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(200).cookie('token', token, options)

    req.isPatient = false;

    res.redirect("/")

})

app.get('/login' ,(req ,res , next)=>{
    res.render("login")
})

app.post('/login', async (req, res, next) => {

    
    const { email, password } = req.body;
    

    const user = await User.findOne({
        email
    })

    const isPasswordMatched = user.comparePassword(password);
    console.log(isPasswordMatched)
    const token = user.getJWTToken();
    console.log(token)

    const options = {
        expires: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(200).cookie('token', token, options)

    req.isPatient = false;

    res.redirect("/")

})
app.get('/register', function (req, res) {
    res.render("Register")
});


app.post('/test', async (req, res, next) => {
    const qno_arr = [8,7,9,10,9,8,7,6,10,8];
    const checkboxwt = [15, 12, 10, 8 , 6];
    let sum = 0;

    const { token } = req.cookies;

    const decodedData = await jwt.verify(token, "wlrng;ksfb kfvj sfugbRWUOBVOSV");

    const user = await User.findById(decodedData.id);
    for (let i = 0; i < 5; i++) {
        let qwt = qno_arr[i];
        console.log('qwt = ' + qwt);
        let selectedOption = parseInt(req.body[`q${i + 1}`], 10); // Convert to number
        console.log('so' + selectedOption);
        sum += qwt * checkboxwt[selectedOption - 1];
    }

    // Round off the sum to no decimal places
    const roundedSum = Math.round(sum / 6.5);
    if(roundedSum < 30) roundedSum = 30;
    user.risk = roundedSum;

    user.save();
    console.log(user.risk);
    res.render("Details", { user });
});


// app.get('/details',function(req,res){
//     res.render("Details")
// })

app.get('/stressmanager', function (req, res) {
    res.render("stressManagement")
})

app.get('/doctor', function (req, res) {
    res.render("doctorCard")
})

app.get('/connect', function (req, res) {
    res.render("Connect")
})


app.get('/testinput', function (req, res) {
    res.render("TestInput")
})

// app.get("/chat" , {

// })

app.listen(5000, function () {
    console.log('Server is running on port 5000');
});












