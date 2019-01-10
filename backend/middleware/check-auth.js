const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // split is for BEARER
    jwt.verify(token, 'secrect_this_should_be_longer');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Auth failed' });
  }
};
