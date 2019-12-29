import React from 'react';
import { CardNumberElement } from 'react-stripe-elements';
import TextField from '@material-ui/core/TextField';
import StripeInput from './StripeInput';

export function StripeNumberTextField(props) {
  const {
    InputLabelProps,
    InputProps,
    fullWidth = true,
    label = 'Credit Card Number',
    labelErrorMessage,
    error,
    margin = 'normal',
    ...other
  } = props;

  return (
    <TextField
      fullWidth={fullWidth}
      margin={margin}
      label={error ? labelErrorMessage || `Invalid ${label}` : label}
      error={error}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        ...InputProps,
        inputProps: {
          component: CardNumberElement,
        },
        inputComponent: StripeInput,
      }}
      {...other}
    />
  );
}
