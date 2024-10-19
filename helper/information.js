const membershipHelper = require("../helper/membership");

const db = require("../model");
const banner = db.banner;
const service_ppob = db.service_ppob;

exports.getBanner = async () => {
  let banners = await banner.findAll({ where: { is_active: 1 } });
  return banners;
};

exports.bannerResponseBuilder = async (banners) => {
  let result = [];
  banners.map((banner) => {
    result.push({
      banner_name: banner.banner_name,
      banner_image: banner.banner_image,
      description: banner.banner_description,
    });
  });
  return result;
};

exports.getServicePPOB = async () => {
  return await service_ppob.findAll();
};

exports.servppobResponseBuilder = async (servppobs) => {
  let result = [];
  servppobs.map((servppob) => {
    result.push({
      service_code: servppob.service_code,
      service_name: servppob.service_name,
      service_icon: servppob.service_icon,
      service_tariff: servppob.service_tarif,
    });
  });
  return result;
};
