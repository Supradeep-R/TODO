const jwt = require("jsonwebtoken");
const SECRET_KEY = "supradeepsecretkey";
const authenticateToken = (req, res, next) => {
  const token = req.headers["x-token"];
  if (token == null) return res.status(401).send("Token not found");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("invalid token");
    req.user = user.user;
    next();
  });
};

module.exports = authenticateToken;
