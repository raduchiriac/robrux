import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class NavBar extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#666', flex: 1 }}>
        &nbsp;
        {/* <TextField
          id="outlined-bare"
          defaultValue="Fuzzy search"
          margin="normal"
          variant="outlined"
          inputProps={{ 'aria-label': 'bare' }}
        /> */}
      </div>
    );
  }
}

export { NavBar };
