const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.json({
      status: "401",
      error: "No token, authorization denied!",
    });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error({
      error: error.message,
    });
    return res.json({
      status: "401",
      error: "Token is not valid!",
    });
  }
};
