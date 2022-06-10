const router = require('express').Router();
const {register,refreshToken,login,logout,getUser,getUsers}= require('../Controllers/userController')
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')


router.post('/register',auth,authAdmin,register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/refresh_token',refreshToken)
router.get('/info',auth,getUser)
router.get('/users',getUsers)



module.exports= router