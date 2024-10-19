// const db = require("../model");
// const Transaction = db.transaction;
const registration = require("../helper/registration");
const validation = require("../helper/validation");

exports.create = async (req, res, next) => {
    try {
        /**
         * Step
         *  - validation
         *  - save DB
         */
        let hashedPwd = registration.registrationHashPassword(req.body.password)
        let dataInsert = {
            user_first_name:req.body.first_name,
            user_last_name:req.body.last_name,
            user_password:hashedPwd,
            user_email:req.body.email,
            is_active:1,
          }
        await validation.emailValidation(req.body.email)
        await validation.passwordValidation(req.body.password)
        await registration.registrationSave(dataInsert)
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
