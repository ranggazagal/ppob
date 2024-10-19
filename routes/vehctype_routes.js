const vehctypeController = require('../controller/vehctype_ctrl');
const router = require('express').Router();

router.get('/', vehctypeController.findAll);
router.get('/:id', vehctypeController.findOne);

module.exports = router;
