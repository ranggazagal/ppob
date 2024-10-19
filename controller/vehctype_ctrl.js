const db = require("../model");
const VechType = db.vechtype;

exports.findAll = (req, res) => {
  VechType.findAll()
      .then((data) => {
        res.json({
          message: "Vehicle Type retrieved successfully.",
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
  VechType.findByPk(req.params.id)
      .then((data) => {
        res.json({
          message: "Vehicle Type retrieved successfully.",
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