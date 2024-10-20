const Validator = require('validatorjs');

exports.emailValidation = async(reqEmail) => {
    new Validator({
        email:reqEmail,
    }, {
        email: 'required|email',
    }).fails(() => {
        throw ({
            Message:"Paramter email tidak sesuai format",
            Status:102});
    });
}

exports.passwordValidation = async (reqPassword) => {
    new Validator({
        email:reqPassword,
    }, {
        email: 'required|min:8',
    }).fails(() => {
        throw ({Message:"Password Minimal 8 karakter", Status:102});
    });
}

exports.topupValidation = async (amount) => {
    new Validator({
        topup:amount,
    }, {
        topup: 'numeric|between:0,999999999999',
    }).fails(() => {
        throw ({Message:"Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0", Status:102});
    });
}
