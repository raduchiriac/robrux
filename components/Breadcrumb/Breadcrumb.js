import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '~/lib/hocs/withLink';

const useStyles = makeStyles(theme => ({
  breadcrumbContainer: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const handleClick = evt => {};

export default function Breadcrumb(props) {
  const classes = useStyles();
  const { links } = props;

  return (
    <div className={classes.breadcrumbContainer}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {links.map((link, idx) => {
          if (idx !== links.length - 1) {
            return (
              <Link replace="true" key={idx} color="inherit" href={link.href} onClick={handleClick}>
                {link.text}
              </Link>
            );
          } else {
            return (
              <Typography key={idx} color="textPrimary">
                {link.text}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
}
