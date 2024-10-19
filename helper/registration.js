const crypto = require('crypto')

const db = require("../model");
const user = db.user;
  
exports.registrationSave = async (data) => {
    return new Promise((res, rej) => {
        user
        .create(data)
        .then((result) => {
          res(result.use);
        })
        .catch((error) => {
          console.log(error)
          rej('Rejection on insert data product')
        });
      })
}

exports.registrationHashPassword = (string) => {
    return crypto.createHash('md5').update(string).digest("hex")
}