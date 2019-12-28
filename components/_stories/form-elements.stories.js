import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxWithLink from '~/components/FormElements/CheckboxWithLink';

storiesOf('Form Elements', module).add('CheckBox with Link', () => {
  let value = false;
  const handleChange = val => {
    value = val;
  };
  const handleLinkClick = () => {};

  return (
    <CheckboxWithLink
      id="test"
      checkboxText="Accept the"
      checkboxLink="terms and conditions"
      checkboxHref="/"
      error={false}
      value={value || false}
      handleChange={value => handleChange(value)}
      handleLinkClick={evt => handleLinkClick(evt)}
    />
  );
});
