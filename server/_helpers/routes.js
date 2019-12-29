const passport = require('passport');
const { stripe } = require('./stripe');

// All for non-GQL routes
module.exports = (server, passport) => {
  server.get('/logout', (req, res) => {
    res.clearCookie('access');
    res.clearCookie('refresh');
    req.logout();
    res.redirect('/');
  });

  server.post('/charge', async (req, res) => {
    try {
      let { status } = await stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        description: 'An example charge',
        source: req.body,
      });

      res.json({ status });
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  });
};
