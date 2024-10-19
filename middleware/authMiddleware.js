const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  try {
    if (!token) throw "Token tidak tidak valid atau kadaluwarsa";
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.responseStatus = e.Status || 108;
    res.responseMessage = e;
    res.responseData = null;
    next();
  }
}

module.exports = verifyToken;
