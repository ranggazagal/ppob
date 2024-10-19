const transactionController = require("../controller/transaction_ctrl");
const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/balance", verifyToken, transactionController.getBalance);
router.post("/topup", verifyToken, transactionController.saveTopup);
router.post("/transaction", verifyToken, transactionController.savePayment);
router.get("/transaction/history", verifyToken, transactionController.getHistory);

module.exports = router;