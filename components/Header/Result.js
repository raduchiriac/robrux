import React, { Fragment } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

export default function Result(props) {
  const handleResultClick = () => {};
  const { result } = props;
  return (
    <ListItem button onClick={handleResultClick} className="result-list__result">
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={result.title} secondary={result.description} />
    </ListItem>
  );
}
