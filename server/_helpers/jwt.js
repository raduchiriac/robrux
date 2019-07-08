const expressJwt = require("express-jwt");

const config = require("../../config.json");
const userService = require("../users/user.service");

const isRevoked = async (req, payload, done) => {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
};

const jwt = () => {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/graphql",
      "/users/authenticate",
      "/users/register"
    ]
  });
};

module.exports = jwt;
