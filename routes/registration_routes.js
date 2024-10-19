const registrationController = require('../controller/registration_ctrl');
const router = require('express').Router();

router.post('/', registrationController.create);

module.exports = router;
