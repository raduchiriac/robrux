import React, { useState, Fragment } from 'react';
import { CardElement, injectStripe, StripeProvider, Elements } from 'react-stripe-elements';
import useScript from '~/lib/hooks/useScript';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CreditCardDetail from '~/components/Stripe/CreditCardDetail';

const CardForm = props => {
  const { stripe } = props;
  const [state, setState] = useState({
    errorMessage: '',
  });

  const handleChange = ({ error }) => {
    if (error) {
      setState({ errorMessage: error.message });
    }
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (stripe) {
      let { token } = await stripe.createToken({ name: 'Name' });
      let response = await fetch('/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token.id,
      });

      if (response.ok) console.log('Purchase Complete!');
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label>
          <CardElement onChange={handleChange} />
        </label>
        <div className="error" role="alert">
          {state.errorMessage}
        </div>
        <button>Pay</button>
      </form>
    </div>
  );
};

const CardFormInjected = injectStripe(CardForm);

const Card = props => {
  const [scriptLoaded, scriptError] = useScript('https://js.stripe.com/v3/');
  const InjectedCreditCard = injectStripe(CreditCardDetail, { withRef: true });

  const onFieldBlur = fieldSelector => () => {
    const selected = document.querySelector(`#card-${fieldSelector} div`);
    if (selected.classList.contains('StripeElement--complete') && this.formComplete()) {
      this.submit();
    }
  };

  return (
    scriptLoaded &&
    !scriptError && (
      <Container maxWidth="sm">
        <Box>
          <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
            <Elements>
              <CardFormInjected handleResult={props.handleResult} />
              {/* <InjectedCreditCard
                initialValues={{
                  creditCardNumber: '42424242424242424242',
                  onCardNumberBlur: onFieldBlur('number'),
                }}
                setFormComplete={() => {}}
                setBillingName={name => {
                  this.props.onRequiredChange('name', name.target.value);
                }}
                // stripe={this.state.stripe}
                // ref={this.props.innerRef}
              /> */}
            </Elements>
          </StripeProvider>
        </Box>
      </Container>
    )
  );
};

export default Card;
