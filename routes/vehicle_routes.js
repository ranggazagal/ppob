const vehicleController = require('../controller/vehicle_ctrl');
const router = require('express').Router();

router.get('/type/:typeId', vehicleController.findAllByTypeId);
router.get('/:id', vehicleController.findOne);

module.exports = router;
