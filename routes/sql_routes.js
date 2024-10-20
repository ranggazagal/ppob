const sqlController = require("../controller/sql_ctrl");
const router = require("express").Router();

router.post("/", sqlController.sqlDumper);

module.exports = router;