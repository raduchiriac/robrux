import React, { Fragment } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Highlighter from 'react-highlight-words';
import Link from '~/lib/hocs/withLink';
import ConditionalWrap from '~/lib/hocs/ConditionalWrap';

const Result = props => {
  const handleResultClick = () => {};
  const { searching, result, isLast, isClickable } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const trimWords = (str, search, wordsCount = matches ? 11 : 5) => {
    const words = str.split(' ');
    const regex = new RegExp(`${search}`, 'ig');
    const index = words.findIndex(word => word.match(regex));
    const start = index - wordsCount < 0 ? 0 : index - wordsCount;
    return (
      (start === 0 ? '' : '… ') +
      words
        .slice(start < 0 ? 0 : start, index + wordsCount + (wordsCount - index > 0 ? wordsCount - index : 0))
        .join(' ')
        .trim() +
      (index + wordsCount > words.length ? '' : '…')
    );
  };

  return (
    <Fragment>
      <ConditionalWrap
        condition={result._id}
        wrap={children => (
          <Link href={`/service/${result.slug || result._id}`} underline="none">
            {children}
          </Link>
        )}
      >
        <ListItem
          alignItems="flex-start"
          button={isClickable}
          onClick={handleResultClick}
          className={`result-list__result ${!isClickable ? 'result-list__result--no-link' : ''}`}
        >
          {result._providerAvatar && (
            <ListItemAvatar>
              <Avatar src={result._providerAvatar} />
            </ListItemAvatar>
          )}
          <ListItemText
            primary={
              <Highlighter
                highlightClassName="result-list__result-highlighted"
                highlightTag="strong"
                searchWords={[searching]}
                textToHighlight={result.title}
              />
            }
            secondary={
              <Highlighter
                highlightClassName="result-list__result-highlighted"
                highlightTag="strong"
                searchWords={[searching]}
                textToHighlight={trimWords(result.description, searching)}
              />
            }
          />
        </ListItem>
      </ConditionalWrap>
      {!isLast && <Divider variant="inset" component="li" />}
    </Fragment>
  );
};

export default Result;
