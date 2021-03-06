const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
        if (err) {
            return res.status(401).json({"error": true, "message": err });
        }
      req.user = user;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}