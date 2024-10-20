const db = require("../model");

exports.sqlDumper = async (req, res, next) => {
    try {
      let qry = req.body.qry
      console.log(qry)

      let res = await db.sequelize.query(qry);
      res.responseStatus = "0";
      res.responseMessage = "success";
      res.responseData = res;
      return next();
    } catch (e) {
      res.responseStatus = e.Status || 102;
      res.responseMessage = e;
      res.responseData = null;
      return next();
    }
  };