// const db = require("../model");
// const Transaction = db.transaction;
const herperService = require("../helper/registration");
const validation = require("../helper/validation");

exports.create = async (req, res, next) => {
    try {
        /**
         * Step
         *  - validation
         *  - save DB
         */

        await validation.emailValidation(req.body.email)
        await validation.passwordValidation(req.body.password)
        await herperService.registrationSave(req,res)
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
