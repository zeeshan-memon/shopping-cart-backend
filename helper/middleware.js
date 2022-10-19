const jwt = require("jsonwebtoken");
const helper = require("./helper");

exports.tokenValidation = (req, res, next) => {
  if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "local") {
    next();
  } else {
    try {
      const token = req.header["authorization"];
      jwt.verify(token, process.env.ENCRYPTIONKEY, (err, decode) => {
        if (err) {
          return res
            .status(200)
            .json(helper.statusMessages.authentication_failed);
        }
        req.session = decode;
        next();
      });
    } catch (error) {}
  }
};

/**
 * ===================================================================================================================
 * Middleware to decode objects provided in the body.
 * ===================================================================================================================
 */

exports.decode = (req, res, next) => {
  if (!helper.toBoolean(process.env.ENCRYPTION)) {
    next();
  } else {
    try {
      if (helper.toBoolean(process.env.ENCRYPTION) && req.body && req.body.d)
        req.body = helper.decryptData(req.body.d);
      next();
    } catch (error) {
      return res.status(200).json(helper.errorMessage(error));
    }
  }
};
