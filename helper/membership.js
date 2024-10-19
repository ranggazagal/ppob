const crypto = require('crypto')
const jwt = require('jsonwebtoken');

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
    let rawQuery = "SELECT * FROM user_ppob WHERE user_email = '" + data.user_email + "' AND user_password = '" + data.user_password + "' limit 0,1" 
    db.sequelize.query(rawQuery)
      .then((data) => {
        let userSelected = data[0][0]
        let token = jwt.sign({ userId: userSelected.user_id }, 'your-secret-key', {
          expiresIn: '12h',
          });
        res(token);
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

exports.getUserById = async (id) => {
  //check data if exist
  let data = await user.findByPk(id)
  if(!data) {
    throw ('Token tidak tidak valid atau kadaluwarsa')
  }
  return data
}