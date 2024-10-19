const membershipController = require("../controller/membership_ctrl");
const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const upload = multer({ storage: storage });

router.post("/registration", membershipController.registration);
router.post("/login", membershipController.login);
router.get("/profile", verifyToken, membershipController.getProfile);
router.put("/profile/update", verifyToken, membershipController.updateProfile);
router.put("/profile/image", verifyToken, upload.single('image'), membershipController.updateProfile);

module.exports = router;
