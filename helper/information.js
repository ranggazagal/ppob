const membershipHelper = require("../helper/membership");

const db = require("../model");
const banner = db.banner;

exports.getBanner = async () => {
  let banners = await banner.findAll({ where: { is_active: 1 } });
  return banners;
};

exports.bannerResponseBuilder = async (banners) => {
  let result = [];
  banners.map((banner) => {
  console.log(banner)
    result.push({
      banner_name: banner.banner_name,
      banner_image: banner.banner_image,
      description: banner.banner_description,
    });
  });
  return result;
};
