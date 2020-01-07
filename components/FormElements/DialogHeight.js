import React, { useRef, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const DialogHeight = props => {
  const { id, open = false, handleClose, title, buttonText } = props;

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`scroll-${id}-title`}
      aria-describedby={`scroll-${id}-description`}
    >
      <DialogTitle id={`scroll-${id}-title`}>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="div" id={`scroll-${id}-description`} ref={descriptionElementRef} tabIndex={-1}>
          {props.children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogHeight.propTypes = {};

export default DialogHeight;
