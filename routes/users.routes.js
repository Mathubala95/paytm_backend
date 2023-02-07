var express = require('express');
const { userRegister, userLogin, userData } = require('../controller/users.controller');
var router = express.Router();

/* users routes */
router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/all',userData);



module.exports = router;
