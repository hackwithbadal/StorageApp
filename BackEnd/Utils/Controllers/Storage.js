const express = require('express')
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const UserSchema = require('../Models/Register.schema');
const path = require('path');
require('dotenv/config')
let UserID;

// storage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(CreateDirectory(file), `resources/${UserID[0].name}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const Upload = multer({ storage: Storage }).any();
router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(404).json({ message: 'Something is went wrong please login again !' })
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        const UserData = await UserSchema.find({ email: decode.email });
        // console.log(UserData[0].UploadedMedia)
        // res.send(fileArray)
        res.json({ fileArray: UserData[0].UploadedMedia })
    } catch (error) {
        return res.send({ message: error });
    }
})

router.post('/', async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(404).send({ message: 'Something is went wrong please login again !' })
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        UserID = await UserSchema.find({ email: decode.email })
    } catch (error) {
        return res.send({ message: error })
    }
    Upload(req, res, (err) => {
        if (err) {
            console.log(err)
            return res.status(501).json({ message: "Error Occurred" })
        }
        return res.status(200).json({ message: "File Uploaded Successfully" })
    })
})
async function SaveIntoDatabase(file) {
    try {
        const Query = await UserSchema.updateOne({ email: UserID[0].email }, { $push: { UploadedMedia: `/${UserID[0].name}/${file.originalname}` } })
    } catch (error) {
        console.log(error)
    }
}
const CreateDirectory = (file) => {
    try {
        fs.mkdir(`./resources/${UserID[0].name}`, { recursive: true }, (error) => {
            if (error) {
                console.log(error);
            } else {
                SaveIntoDatabase(file);
            }
        })
    } catch (error) {
        return null;
    }
}


module.exports = router;