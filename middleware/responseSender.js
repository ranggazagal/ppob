module.exports = function(req, res, next) {
    let msg = {};
    msg.status = res.responseStatus;
    msg.message = res.responseMessage;
    msg.data = res.responseData;
    res.send(msg);
    next();
  };