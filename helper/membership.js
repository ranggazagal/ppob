const crypto = require('crypto')

const db = require("../model");
const user = db.user;
  
exports.registrationSave = async (data) => {
    //check data if exist
    let isExist = await user.findOne({
      where: {user_email: data.user_email}
    })
    if(isExist) {
      throw ('Email sudah terdaftar')
    }
    //save data 
    return new Promise((res, rej) => {
        user
        .create(data)
        .then((result) => {
          res(result);
        })
        .catch((error) => {
          console.log(error)
          rej('Gagal dalam insert data user')
        });
      })
}

exports.findUserByUsernameAndPassword = async (data) => {
  return new Promise((res, rej) => {
    let rawQuery = "SELECT * FROM user_ppob WHERE user_email = '" + data.user_email + "' AND user_password = '" + data.user_password + "' limit 1" 
    db.sequelize.query(rawQuery)
      .then((data) => {
        res(data);
      })
      .catch((error) => {
        console.log(error)
        rej('Email atau password, salah!')
      });
    })
}

exports.registrationHashPassword = (string) => {
    return crypto.createHash('md5').update(string).digest("hex")
}