const informationHelper = require("../helper/information");

exports.getBanner = async (req, res, next) => {
  try {
    let banner = await informationHelper.getBanner()
    let bannerResponse = await informationHelper.bannerResponseBuilder(banner)
    res.responseStatus = "0";
    res.responseMessage = "success";
    res.responseData = bannerResponse;
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 102;
    res.responseMessage = e;
    res.responseData = null;
    return next();
  }
};

exports.getService = async (req, res, next) => {
  try {
    res.responseStatus = "0";
    res.responseMessage = "success";
    res.responseData = {};
    return next();
  } catch (e) {
    res.responseStatus = e.Status || 102;
    res.responseMessage = e;
    res.responseData = null;
    return next();
  }
};
