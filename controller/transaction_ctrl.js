exports.getBalance = async (req, res, next) => {
    try {
      res.responseStatus = "0";
      res.responseMessage = "Sukses";
      res.responseData = { };
      return next();
    } catch (e) {
      res.responseStatus = e.Status || 108;
      res.responseMessage = e;
      res.responseData = null;
      return next();
    }
  };

  exports.saveTopup = async (req, res, next) => {
    try {
      res.responseStatus = "0";
      res.responseMessage = "Sukses";
      res.responseData = { };
      return next();
    } catch (e) {
      res.responseStatus = e.Status || 108;
      res.responseMessage = e;
      res.responseData = null;
      return next();
    }
  };

  exports.savePayment = async (req, res, next) => {
    try {
      res.responseStatus = "0";
      res.responseMessage = "Sukses";
      res.responseData = { };
      return next();
    } catch (e) {
      res.responseStatus = e.Status || 108;
      res.responseMessage = e;
      res.responseData = null;
      return next();
    }
  };

  exports.getHistory = async (req, res, next) => {
    try {
      res.responseStatus = "0";
      res.responseMessage = "Sukses";
      res.responseData = { };
      return next();
    } catch (e) {
      res.responseStatus = e.Status || 108;
      res.responseMessage = e;
      res.responseData = null;
      return next();
    }
  };