const router = require('express').Router();
const { register,login,userEvent,adminEvent} = require('../controller/user')
const {verifyUserToken,isUser,isAdmin} = require('../middleware/auth')


router.post("/register",register)

router.post("/login",login)

// Auth user only
router.get('/events', verifyUserToken, isUser, userEvent);

// Auth Admin only
router.get('/special', verifyUserToken, isAdmin, adminEvent);



module.exports = router;