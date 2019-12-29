import React from 'react';
import { fade, useTheme } from '@material-ui/core/styles';

export default function StripeInput(props) {
  const {
    component: Component,
    inputRef,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribeBy,
    defaultValue,
    required,
    onKeyDown,
    onKeyUp,
    readOnly,
    autoComplete,
    autoFocus,
    type,
    name,
    rows,
    ...other
  } = props;
  const theme = useTheme();
  const [mountNode, setMountNode] = React.useState(null);

  React.useImperativeHandle(
    inputRef,
    () => ({
      focus: () => mountNode.focus(),
    }),
    [mountNode]
  );

  return (
    <Component
      onReady={setMountNode}
      style={{
        base: {
          color: theme.palette.text.primary,
          fontSize: `${theme.typography.fontSize}px`,
          fontFamily: theme.typography.fontFamily,
          '::placeholder': {
            color: fade(theme.palette.text.primary, 0.42),
          },
        },
        invalid: {
          color: theme.palette.text.primary,
        },
      }}
      {...other}
    />
  );
}
