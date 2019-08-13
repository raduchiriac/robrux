import React, { Fragment } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';
import Highlighter from 'react-highlight-words';

export default function Result(props) {
  const handleResultClick = () => {};
  const { searching, result, isLast, isClickable } = props;

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
        <ListItemText
          primary={<Highlighter highlightTag="strong" searchWords={[searching]} textToHighlight={result.title} />}
          secondary={
            <Highlighter highlightTag="strong" searchWords={[searching]} textToHighlight={result.description} />
          }
        />
      </ListItem>
      {!isLast && <Divider variant="inset" component="li" />}
    </Fragment>
  );
}
