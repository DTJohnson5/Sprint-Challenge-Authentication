/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const secret = require("../private/privacy.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
      if(error) {
        res.status(401).json({ You: 'are not a natural male!' });
      } else {
        req.user = {
          name: decodedToken.username,
          section: decodedToken.department
        };
        next();
      }
    });
  } else {
    res.status(400).json({Denial: "This page is for actual and NATURAL dads only!"});
  }
};
