const transactionHelper = require("../helper/transaction");
const validationHelper = require("../helper/validation");
const { transaction_type } = require("../model");

exports.getBalance = async (req, res, next) => {
  try {
    let balance = await transactionHelper.getBalance(req.userId);
    res.responseStatus = "0";
    res.responseMessage = "Sukses";
    res.responseData = { balance: balance };
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 108;
    res.responseMessage = e;
    res.responseData = null;
    return next();
  }
};

exports.saveTopup = async (req, res, next) => {
  try {
    let transaction_type = "TOPUP";
    let amount = req.body.top_up_amount;
    await validationHelper.topupValidation();

    let dataSave = await transactionHelper.generateTransactionData(
      req.userId,
      amount,
      transaction_type,
      null
    );
    let balance = await transactionHelper.saveTransaction(
      dataSave,
      transaction_type
    );

    res.responseStatus = "0";
    res.responseMessage = "Top Up Balance berhasil";
    res.responseData = { balance: balance.updated_balance };
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 108;
    res.responseMessage = e;
    res.responseData = null;
    return next();
  }
};

exports.savePayment = async (req, res, next) => {
  try {
    let transaction_type = "PAYMENT";
    let servCode = req.body.service_code;
    let servicePpob = await transactionHelper.getServicePPOB(servCode);
    let amount = servicePpob.service_tarif;
    let dataSave = await transactionHelper.generateTransactionData(
      req.userId,
      amount,
      transaction_type,
      servicePpob.service_id
    );
    let result = await transactionHelper.saveTransaction(
      dataSave,
      transaction_type
    );
    res.responseStatus = "0";
    res.responseMessage = "Transaksi Berhasil";
    res.responseData = result;
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 108;
    res.responseMessage = e.Message;
    res.responseData = null;
    return next();
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    let limit = req.query.limit;
    let offset = req.query.offset;
    let result = await transactionHelper.getHistoryTransaction(limit, offset, req.userId);
    res.responseStatus = "0";
    res.responseMessage = "Sukses";
    res.responseData = {
      offset: offset,
      limit:limit,
      records:result,
    };
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 108;
    res.responseMessage = e;
    res.responseData = null;
    return next();
  }
};
