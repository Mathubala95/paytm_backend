var express = require('express');
const { utilityRecharge, utilityData } = require('../controller/utility.controller');
const { authenticate } = require('../lib/authorize');
var router = express.Router();

/* utility routes */
router.post('/payment',authenticate, utilityRecharge);
router.get('/all',authenticate ,utilityData);




module.exports = router;
