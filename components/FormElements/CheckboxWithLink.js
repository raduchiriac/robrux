import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '~/lib/hocs/withLink';

const useStyles = props =>
  makeStyles(theme => ({
    checkbox: {},
    label: { color: props.error ? theme.palette.error.main : 'inherit' },
    link: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      color: props.error ? 'inherit' : theme.palette.primary.main,
      textDecoration: 'underline',
    },
  }))(props);

const CheckboxWithLink = ({
  id,
  required,
  checkboxText = '',
  checkboxLink = '',
  checkboxHref = '/',
  error,
  value,
  handleChange = () => {},
  handleLinkClick,
}) => {
  const classes = useStyles({ error });

  const label = (
    <div className={classes.label}>
      <span>{checkboxText}</span>
      <Link className={classes.link} href={checkboxHref} onClick={handleLinkClick || false} target="_blank">
        {checkboxLink}
      </Link>
      {required && <span>*</span>}
    </div>
  );

  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          className={classes.checkbox}
          checked={value || false}
          id={id}
          name={id}
          onChange={evt => handleChange(evt.target.checked, id)}
        />
      }
      label={label}
    />
  );
};

export default CheckboxWithLink;
