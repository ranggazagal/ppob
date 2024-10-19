const Validator = require('validatorjs');

exports.emailValidation = async(reqEmail) => {
    new Validator({
        email:reqEmail,
    }, {
        email: 'required|email',
    }).fails(() => {
        throw ("Paramter email tidak sesuai format");
    });
}

exports.passwordValidation = async (reqPassword) => {
    new Validator({
        email:reqPassword,
    }, {
        email: 'required|min:8',
    }).fails(() => {
        throw ("Password minimal 8");
    });
}