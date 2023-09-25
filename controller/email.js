const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    service:"GMAIL",
    auth: {
        user: 'rahulsde2111@gmail.com',
        pass: 'lbwl ktnj hesy xomt',
     },
secure: true,
})


const sendMailPost = (req,res) => {
    const {to,subject,text} = req.body;
    const mailData = {
        from: 'rahulsde2111@gmail.com',  // sender address
        to: to,   // list of receivers
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',

    }
    transporter.sendMail(mailData).then((result) => {
        res.status(200).send({ message: "Mail send", message_id: result.messageId });
    }).catch((error) => {
        console.log(error)
      })
    
}



module.exports = {sendMailPost};