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
        throw ({Message:"Paramter email tidak sesuai format", Status:102});
    });
}