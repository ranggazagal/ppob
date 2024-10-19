const transactionHelper = require("../helper/transaction");
const validationHelper = require("../helper/validation");

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
    let amount = req.body.top_up_amount;
    await validationHelper.topupValidation();

    let latestBalance = await transactionHelper.getBalance(req.userId);
    let topupType = await transactionHelper.getTrxType("TOPUP");
    // console.log(topupType)
    let date = new Date();
    let updatedBalance = await transactionHelper.amountCounter(
      topupType,
      latestBalance,
      amount
    );
    // console.log(updatedBalance)
    let counterInvoice = await transactionHelper.getCounter();
    let invoiceId = await transactionHelper.generateInvoice(counterInvoice);
    // console.log("topupType.transaction_type_id " + topupType.transaction_type_id)
    let dataSave = {
      transaction_code: invoiceId,
      transaction_date: date,
      transaction_amount: amount,
      latest_balance: latestBalance,
      updated_balance: updatedBalance,
      transaction_type_id: topupType.transaction_type_id,
      user_id: req.userId,
      service_id: null,
      counter_invoice: counterInvoice
    };

    let balance = await transactionHelper.saveTransaction(dataSave);
    console.log(balance)
    res.responseStatus = "0";
    res.responseMessage = "Top Up Balance berhasil";
    res.responseData = { balance };
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
    res.responseStatus = "0";
    res.responseMessage = "Sukses";
    res.responseData = {};
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 108;
    res.responseMessage = e;
    res.responseData = null;
    return next();
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    res.responseStatus = "0";
    res.responseMessage = "Sukses";
    res.responseData = {};
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 108;
    res.responseMessage = e;
    res.responseData = null;
    return next();
  }
};
