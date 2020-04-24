import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxWithLink from '~/components/FormElements/CheckboxWithLink';

storiesOf('Form Elements', module).add('CheckBox with Link', () => {
  const [value, setValue] = useState(false);

  const handleLinkClick = evt => {
    evt.preventDefault();
    console.log('This should open a dialog box');
  };

  return (
    <CheckboxWithLink
      id="test"
      checkboxText="Accept the"
      checkboxLink="terms and conditions"
      checkboxHref="/"
      error={false}
      value={value || false}
      handleChange={value => setValue(value)}
      handleLinkClick={evt => handleLinkClick(evt)}
    />
  );
});
