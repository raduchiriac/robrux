import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { StripeNumberTextField } from './commonTextFields';

export default class CreditCardDetail extends React.Component {
  state = {
    creditCardNumberComplete: false,
    expirationDateComplete: false,
    cvcComplete: false,
    cardNameError: false,
    cardNumberError: false,
    expiredError: false,
    cvcError: false,
  };

  onElementChange = (field, errorField) => ({ complete, error = { message: null } }) => {
    this.setState({ [field]: complete, [errorField]: error.message });
    const expectedState = { ...this.state };
    expectedState[field] = complete;
    this.props.setFormComplete(
      expectedState.creditCardNumberComplete && expectedState.cvcComplete && expectedState.expirationDateComplete
    );
  };

  render() {
    const { cardNumberError } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} id={'card-number'}>
          <StripeNumberTextField
            error={Boolean(cardNumberError)}
            labelErrorMessage={cardNumberError}
            variant="outlined"
            onChange={this.onElementChange('creditCardNumberComplete', 'cardNumberError')}
          />
        </Grid>
      </Grid>
    );
  }
}

CreditCardDetail.propTypes = {
  setBillingName: PropTypes.func.isRequired,
  setFormComplete: PropTypes.func.isRequired,
};
