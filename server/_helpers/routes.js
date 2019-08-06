const passport = require('passport');

// All for non-GQL routes
module.exports = (server, passport) => {
  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
