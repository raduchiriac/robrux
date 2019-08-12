import React, { Fragment } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';

export default function Result(props) {
  const handleResultClick = () => {};
  const { result, isLast, isClickable } = props;
  return (
    <Fragment>
      <ListItem
        alignItems="flex-start"
        button={isClickable}
        onClick={handleResultClick}
        className={`result-list__result ${!isClickable ? 'result-list__result--no-link' : ''}`}
      >
        {result.images && (
          <ListItemAvatar>
            <Avatar src={result.images[0]} />
          </ListItemAvatar>
        )}
        <ListItemText primary={result.title} secondary={result.description} />
      </ListItem>
      {!isLast && <Divider variant="inset" component="li" />}
    </Fragment>
  );
}
