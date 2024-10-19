const db = require("../model");
const transaction = db.transaction;

exports.getBalance = async (userId) => {
  let balance = 0;
  let rawQry =
    "Select updated_balance from transaction_ppob where user_id = :userId " +
    "order by transaction_date desc limit 0,1";
  let resltQry = await db.sequelize.query(rawQry, {
    replacements: { userId: userId },
  });
  let formatedResult = resltQry[0][0];

  if (formatedResult && formatedResult.updated_balance) {
    balance = formatedResult.updated_balance;
  }
  return balance;
};

exports.generateInvoice = async (counter) => {
  return "INV" + dateDDMMYYYYFormat() + "-" + paddy(counter, 3);
};

exports.getTrxType = async (codeType) => {
  let rawQry =
    "Select transaction_type_id, transaction_type_operate from transaction_type_ppob where transaction_type_code = :topUpCode " +
    "limit 0,1";
  let resltQry = await db.sequelize.query(rawQry, {
    replacements: { topUpCode: codeType },
  });
  return resltQry[0][0];
};

exports.amountCounter = async (topupType, balance, amount) => {
  let updated_balance;
  /**
   * transaction_type_operate = boolean
   * if == 1, maka ditambahkan
   */
  if (topupType.transaction_type_operate == 1) {
    updated_balance = balance + amount;
  } else {
    updated_balance = balance - amount;
  }
  return updated_balance;
};

exports.getCounter = async () => {
  let counter = 0;
  let rawQry =
    "Select counter from config_helper where helper_code = :code " +
    "limit 0,1";
  let resltQryes = await db.sequelize.query(rawQry, {
    replacements: { code: "invoice_counter" },
  });
  let resltQry = resltQryes[0][0];
  if (resltQry && resltQry.counter) {
    counter = resltQry.counter;
  }
  return counter + 1;
};

exports.saveTransaction = async (dataSave) => {
  console.log(dataSave);
  let balance = 0;
  let rawQry =
    "INSERT INTO transaction_ppob(transaction_code,transaction_date,transaction_amount,latest_balance,updated_balance,transaction_type_id,user_id,service_id) " +
    "VALUES(:transaction_code, :transaction_date, :transaction_amount, :latest_balance, :updated_balance, :transaction_type_id, :user_id, :service_id)";

  let rawQryCounter =
    "UPDATE config_helper SET counter=:counter WHERE helper_code=:code";

  let resltQries = await db.sequelize.query(rawQry, {
    replacements: {
      transaction_code: dataSave.transaction_code,
      transaction_date: dataSave.transaction_date,
      transaction_amount: dataSave.transaction_amount,
      latest_balance: dataSave.latest_balance,
      updated_balance: dataSave.updated_balance,
      transaction_type_id: dataSave.transaction_type_id,
      user_id: dataSave.user_id,
      service_id: dataSave.service_id,
    },
  });

  if (resltQries) {
    // add flag counter
    await db.sequelize.query(rawQryCounter, {
      replacements: {
        counter: dataSave.counter_invoice,
        code: "invoice_counter",
      },
    });
  }

  return dataSave.updated_balance;
};

let dateDDMMYYYYFormat = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return day + month + year;
};

let paddy = (num, padlen, padchar) => {
  let pad_char = typeof padchar !== "undefined" ? padchar : "0";
  let pad = new Array(1 + padlen).join(pad_char);
  return (pad + num).slice(-pad.length);
};
