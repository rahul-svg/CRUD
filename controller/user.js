const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const dotenv = require('dotenv');
require('dotenv').config();
const secretKey =  process.env.SECRET_KEY;


const register = async (req, res) => {

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    let user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hasPassword,
        user_type_id: req.body.user_type_id
    })

    // Save User in the database
    user.save().then((registeredUser) => {
       if(!registeredUser){
        res.status(500).send({ msg:"Internal Server Error" })
       }
       let payload = { id: registeredUser._id, user_type_id: req.body.user_type_id || 0 };
       const token = jwt.sign(payload, secretKey);
       res.status(200).send({ token })
    }).catch((error) => {
      console.log(error)
    })
}

const login = async (req,res) => {
    // User.findOne( email: req.body.email }, async (err, user) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if (user) {
    //             const validPass = await bcrypt.compare(req.body.password, user.password);
    //             if (!validPass) return res.status(401).send("Mobile/Email or Password is wrong");

    //             // Create and assign token
    //             let payload = { id: user._id, user_type_id: user.user_type_id };
    //             const token = jwt.sign(payload, config.TOKEN_SECRET);

    //             res.status(200).header("auth-token", token).send({ "token": token });
    //         }
    //         else {
    //             res.status(401).send('Invalid Email')
    //         }

    //     }
    // })

    User.findOne({email: req.body.email}).then((user) => {
       if(user){
        const validPass =  bcrypt.compare(req.body.passwprd,user.password);
        if(!validPass){return res.status(401).send("Email or Password is incorrect")}
        let payload = { id: user._id, user_type_id: user.user_type_id };
        const token = jwt.sign(payload,secretKey);
        res.status(200).header("auth-token", token).send({ "token": token ,msg:"Login Successfully"});

       }else{
        res.status(401).send('Invalid Email')
       }
    }).catch((error) => {
        console.log(error)
    })
}


// Access auth users only
const userEvent = (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
};

const  adminEvent = (req, res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(specialEvents)

}


module.exports = {
    register,login,userEvent,adminEvent
}