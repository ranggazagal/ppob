const db = require("../model");

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

exports.saveTransaction = async (dataSave, type) => {
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
    type: db.sequelize.QueryTypes.INSERT,
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

  let rawQrySaved
  if(type == "PAYMENT") {
    rawQrySaved = 
    "SELECT a.transaction_code, b.service_code, b.service_name, c.transaction_type_code, b.service_tarif, a.transaction_date " +
    "FROM transaction_ppob a INNER JOIN service_ppob b ON a.service_id = b.service_id " +
    "INNER JOIN transaction_type_ppob c ON a.transaction_type_id = c.transaction_type_id " +
    "WHERE a.transaction_id = :transaction_id"
  } else {
    rawQrySaved =
    "SELECT updated_balance from transaction_ppob WHERE transaction_id = :transaction_id"
  }

  let resultQryPayment = await db.sequelize.query(rawQrySaved, {
    replacements: {
        transaction_id: resltQries[0],
    },
  });

  return resultQryPayment[0][0];
};

exports.getServicePPOB = async (servCode) => {
    let rawQry =
      "Select service_id, service_name, service_tarif from service_ppob where service_code = :code " +
      "limit 0,1";
    let resltQryes = await db.sequelize.query(rawQry, {
      replacements: { code: servCode },
    });
    let resltQry = resltQryes[0][0];
    if (!resltQry) {
      throw ({Message:"Service ataus Layanan tidak ditemukan", Status:102});
    }
    return resltQry;
  };

exports.generateTransactionData = async (userId, amount, trxType, serviceId) => {
    let latestBalance = await this.getBalance(userId);
    let topupType = await this.getTrxType(trxType);
    let date = new Date();
    let updatedBalance = await this.amountCounter(
      topupType,
      latestBalance,
      amount
    );
    if(updatedBalance < 0) {
        throw ({Message:"Balance anda tidak cukup mohon topup terlebih dahulu", Status:102});
    }
    let counterInvoice = await this.getCounter();
    let invoiceId = await this.generateInvoice(counterInvoice);
    let dataSave = {
      transaction_code: invoiceId,
      transaction_date: date,
      transaction_amount: amount,
      latest_balance: latestBalance,
      updated_balance: updatedBalance,
      transaction_type_id: topupType.transaction_type_id,
      user_id: userId,
      service_id: serviceId,
      counter_invoice: counterInvoice
    };
    return dataSave;
}

exports.getHistoryTransaction = async (limit, offset) => {
    let rawQry = 
    "SELECT a.transaction_code, b.transaction_type_code, a.transaction_amount, a.transaction_date " +
    "FROM transaction_ppob a INNER JOIN transaction_type_ppob b on a.transaction_type_id = b.transaction_type_id " + 
    "ORDER BY a.transaction_date DESC"

    if(limit) {
        rawQry += " LIMIT " + limit
    }
    if(offset) {
        rawQry += " OFFSET " + offset
    }

    let resltQryes = await db.sequelize.query(rawQry)
    
    let result = []
    resltQryes[0].map((data) => {
        result.push({
            invoice_number:data.transaction_code,
            transaction_type:data.transaction_type_code,
            total_amount:data.transaction_amount,
            created_on:data.transaction_date
        })
    })
    return result;
}

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
