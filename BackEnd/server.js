const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const bodyparser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookie());
app.use(bodyparser.json());
require('dotenv/config');
const Validate = require('./Utils/validate/jwt');

//connection String
mongoose.connect('mongodb://localhost:27017/hostingapp', () => { console.log("Connected To DB !") });

app.get('/', (req, res) => {
    res.json({ message: "Success" })
})

const LoginRoute = require("./Utils/Routes/Login");
app.use('/login', LoginRoute);

const RegisterRoute = require("./Utils/Routes/Register");
app.use('/register', RegisterRoute);

const UploadRoute = require('./Utils/Controllers/Storage');
app.use('/fileupload', UploadRoute);

app.use('/files', express.static('resources'));

app.get('/:id', (req, res) => {
    console.log(req.params.id);
})

//listening on port 
app.listen(process.env.PORT, () => { console.log(`Server Started on Port ${process.env.PORT}`) });