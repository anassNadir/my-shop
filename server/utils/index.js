const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user.user;
    next();
  });
};
const createToken = (user, expiresIn) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn });
};
module.exports = {
  authenticateToken,
  createToken
};