const transactionController = require('../controller/transaction_ctrl');
const router = require('express').Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage })

router.post('/', upload.single('image'), transactionController.create);
// router.get('/:id', transactionController.findOne);

module.exports = router;
