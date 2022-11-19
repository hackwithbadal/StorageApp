const express = require('express');
const router = express.Router();
const UserSchema = require('../Models/Register.schema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const fs = require('fs');
const IP = require('ip');

router.get('/', (req, res) => {
    res.json({ message: "login" })
})

router.post('/', async (req, res) => {
    const UserIP = IP.address();
    // console.log(req.body);
    const EmailExits = await UserSchema.findOne({ email: req.body.email });
    if (!EmailExits) return res.json({ message: "Wrong Username" });

    const ValidatePassWord = await bcryptjs.compare(req.body.password, EmailExits.password);
    if (!ValidatePassWord) return res.json({ message: "Wrong password" });
    
    const VerifiedToken = jwt.sign({ email: EmailExits.email }, process.env.TOKEN_SECRET, { expiresIn: "10days" });
    const userData = await UserSchema.find({ email: req.body.email });
    try {
        fs.appendFile('UserLogIn.txt', `${userData[0].email}\t Dated On:${Date.now()}\tIPv4:${UserIP}\n`, err => {
            if (err) {
                console.log(err);
            }
        });
    } catch (error) {
    }
    res.json({
        message: "Successfully",
        token: VerifiedToken,
        UserInfo: {
            name: userData[0].name,
            email: userData[0].email,
            number: userData[0].number,
            addr: userData[0].addr,
            date: userData[0].date
        }
    });
})

module.exports = router;