import React, { Component } from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import useScript from '~/lib/hooks/useScript';

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    },
  };
};

class _CardForm extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="CardDemo">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <CardElement onChange={this.handleChange} {...createOptions()} />
          </label>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
          <button>Pay</button>
        </form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

const Card = props => {
  const [scriptLoaded, scriptError] = useScript('https://js.stripe.com/v3/');

  return (
    scriptLoaded &&
    !scriptError && (
      <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
        <Elements>
          <CardForm handleResult={props.handleResult} />
        </Elements>
      </StripeProvider>
    )
  );
};

export default Card;
