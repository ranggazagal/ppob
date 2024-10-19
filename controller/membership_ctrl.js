// const db = require("../model");
// const Transaction = db.transaction;
const membershipHelper = require("../helper/membership");
const validationHelper = require("../helper/validation");

exports.registration = async (req, res, next) => {
    try {
        /**
         * Step
         *  - validation
         *  - save DB
         */
        let hashedPwd = membershipHelper.registrationHashPassword(req.body.password)
        let dataInsert = {
            user_first_name:req.body.first_name,
            user_last_name:req.body.last_name,
            user_password:hashedPwd,
            user_email:req.body.email,
            is_active:1,
          }
        await validationHelper.emailValidation(req.body.email)
        await validationHelper.passwordValidation(req.body.password)
        await membershipHelper.registrationSave(dataInsert)
        res.responseStatus = "0"
        res.responseMessage = "success"
        res.responseData = {}
        return next()
    }catch(e) {
        console.log(e)
        res.responseStatus = e.Status || 102
        res.responseMessage = e
        res.responseData = null
        return next()
    }
};

exports.login = async (req, res, next) => {
    try {
      
        let hashedPwd = membershipHelper.registrationHashPassword(req.body.password)
        let dataSelect = {
            user_password:hashedPwd,
            user_email:req.body.email,
          }
        await validationHelper.emailValidation(req.body.email)
        await validationHelper.passwordValidation(req.body.password)
        await membershipHelper.findUserByUsernameAndPassword(dataSelect)
        res.responseStatus = "0"
        res.responseMessage = "success"
        res.responseData = {}
        return next()
    }catch(e) {
        console.log(e)
        res.responseStatus = e.Status || 102
        res.responseMessage = e
        res.responseData = null
        return next()
    }
};
