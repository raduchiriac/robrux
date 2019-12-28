const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchErrors = err => {
  let message = '';
  switch (err.type) {
    case 'StripeCardError':
      // A declined card error
      message = err.message; // => e.g. "Your card's expiration year is invalid."
      break;
    case 'StripeRateLimitError':
      // Too many requests made to the API too quickly
      break;
    case 'StripeInvalidRequestError':
      // Invalid parameters were supplied to Stripe's API
      break;
    case 'StripeAPIError':
      // An error occurred internally with Stripe's API
      break;
    case 'StripeConnectionError':
      // Some kind of error occurred during the HTTPS communication
      break;
    case 'StripeAuthenticationError':
      // You probably used an incorrect API key
      break;
    default:
      // Handle any other types of unexpected errors
      break;
  }
  return message;
};

const createCustomer = metadata =>
  stripe.customers.create(metadata).then(
    function(result) {
      console.log('customer-create', result);
    },
    function(err) {
      catchErrors(err);
    }
  );

module.exports = { createCustomer };
