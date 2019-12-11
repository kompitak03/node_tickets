const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, SECRET_KEY);

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        res.status(401).send({
          success: false,
          msg: err
        });
        // throw new Error(err);
      }
    } else {
      result = {
        success: false,
        msg: "Authentication error. Token required."
      };
      res.status(401).send(result);
    }
  }
};
