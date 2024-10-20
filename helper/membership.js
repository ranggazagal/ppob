const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const db = require("../model");
const user = db.user;

exports.registrationSave = async (data) => {
  //check data if exist
  let isExist = await user.findOne({
    where: { user_email: data.user_email },
  });
  if (isExist) {
    throw "Email sudah terdaftar";
  }
  //save data
  return new Promise((res, rej) => {
    user
      .create(data)
      .then((result) => {
        res(result);
      })
      .catch((error) => {
        console.log(error);
        rej("Gagal dalam insert data user");
      });
  });
};

exports.findUserByUsernameAndPassword = async (data) => {
  return new Promise((res, rej) => {
    let rawQuery =
      "SELECT * FROM user_ppob WHERE user_email = '" +
      data.user_email +
      "' AND user_password = '" +
      data.user_password +
      "' limit 0,1";
    db.sequelize
      .query(rawQuery)
      .then((data) => {
        let userSelected = data[0][0];
        if (!userSelected) {
          throw "Email atau password, salah!";
        }
        let token = jwt.sign(
          { userId: userSelected.user_id },
          "your-secret-key",
          {
            expiresIn: "12h",
          }
        );
        res(token);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

exports.registrationHashPassword = (string) => {
  return crypto.createHash("md5").update(string).digest("hex");
};

exports.getUserById = async (id) => {
  //check data if exist
  let data = await user.findByPk(id);
  if (!data) {
    throw "Token tidak tidak valid atau kadaluwarsa";
  }
  return data;
};

exports.updateProfile = async (id, dataUpdate) => {
  let rawQuery;

  if (dataUpdate.user_profile_image) {
    rawQuery =
      "UPDATE user_ppob set user_profile_image = '" +
      dataUpdate.user_profile_image +
      "' WHERE user_id = " +
      id;
  } else if (dataUpdate.user_first_name && dataUpdate.user_last_name) {
    rawQuery =
      "UPDATE user_ppob set user_first_name = '" +
      dataUpdate.user_first_name +
      "', user_last_name = '" +
      dataUpdate.user_last_name +
      "' WHERE user_id = " +
      id;
  } else {
    throw "Gagal mengupdate data, data yang diinputkan tidak valid";
  }

  await db.sequelize.query(rawQuery);
  let data = await user.findByPk(id);
  if (!data) {
    throw "Token tidak tidak valid atau kadaluwarsa";
  }

  return data;
};

exports.imageHelper = async (req, dataUpdate) => {
  if (req.file) {
    let file = req.file;
    let allowedFileType = ["jpeg", "png"];
    if (!allowedFileType.includes(file.mimetype.split("/")[1])) {
      throw "Format Image tidak sesuai";
    }
    dataUpdate.user_profile_image = "/assets/" + req.file.filename;
    console.log(dataUpdate);
  }
  return dataUpdate;
};

exports.userResponseBuilder = (user) => {
  return {
    email: user.user_email,
    first_name: user.user_first_name,
    last_name: user.user_last_name,
    profile_image: user.user_profile_image,
  };
};
