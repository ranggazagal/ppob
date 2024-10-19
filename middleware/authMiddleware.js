const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  try {
    if (!token) throw "";
    let decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (e) {
    let msg = {}
    msg.status = 108
    msg.message = "Token tidak tidak valid atau kadaluwarsa";
    msg.data = null
    res.send(msg);
    next();
  }
}

module.exports = verifyToken;
