const membershipController = require('../controller/membership_ctrl');
const router = require('express').Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/registration', membershipController.registration);
router.post('/login', membershipController.login);
router.get('/profile', verifyToken, membershipController.getProfile);
router.put('/profile/update', verifyToken, membershipController.updateProfile);

module.exports = router;
