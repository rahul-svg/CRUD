const router = require('express').Router();
const {sendMailPost} = require('../controller/email')

router.post("/text-mail", sendMailPost)

module.exports = router;
