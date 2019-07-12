import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
});

class NavBar extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#5E594A', flex: 1 }}>
        <TextField
          id="outlined-bare"
          defaultValue="Fuzzy search"
          margin="normal"
          variant="outlined"
          inputProps={{ 'aria-label': 'bare' }}
        />
      </div>
    );
  }
}

export { NavBar };
