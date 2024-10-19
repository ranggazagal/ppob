const membershipController = require('../controller/membership_ctrl');
const router = require('express').Router();

router.post('/registration', membershipController.registration);
router.post('/login', membershipController.login);

module.exports = router;
