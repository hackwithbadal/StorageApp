const express = require('express');
const router = express.Router();
const UserSchema = require('../Models/Register.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require("dotenv/config");
const IP = require('ip')

router.get('/', (req, res) => {
    res.json({ message: "register" })
})

router.post('/', async (req, res) => {
    // check if email exit
    const emailExits = await UserSchema.findOne({ email: req.body.email });
    if (emailExits) return res.json({ 'message': "Email already exists try another one" })

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserSchema({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        addr: req.body.addr,
        perposeOfUse: req.body.perposeOfUse,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        console.log(savedUser);
        const VerifiedToken = jwt.sign({ email: savedUser.email }, process.env.TOKEN_SECRET, { expiresIn: "10days" });
        res.json({
            message: "Successfully",
            token: VerifiedToken,
            UserInfo: {
                name: savedUser.name,
                email: savedUser.email,
                number: savedUser.number,
                addr: savedUser.addr,
                date: savedUser.date
            }
        });
    } catch (err) {
        res.status(500).send({ message: "Enter Valid Information" });
    }
});

module.exports = router;

