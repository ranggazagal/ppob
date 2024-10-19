const informationController = require("../controller/information_ctrl");
const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/banner", informationController.getBanner);
router.get("/service", verifyToken, informationController.getService);

module.exports = router;