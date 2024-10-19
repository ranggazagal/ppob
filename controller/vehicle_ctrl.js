const db = require("../model");
const Vehicle = db.vehicle;

exports.findAllByTypeId = (req, res) => {
    Vehicle.findAll({
    where:{
        VehcTypeCode:req.params.typeId
    }})
      .then((data) => {
        res.json({
          message: "Vehicle retrieved successfully.",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || "Some error occurred while retrieving books.",
          data: null,
        });
      });
  };

exports.findOne = (req, res) => {
    Vehicle.findByPk(req.params.id)
      .then((data) => {
        res.json({
          message: "Vehicle retrieved successfully.",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || "Some error occurred while retrieving book.",
          data: null,
        });
      });
  };