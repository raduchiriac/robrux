import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';
import parse from 'html-react-parser';
import withApollo from '~/lib/hocs/withApollo';
import Link from '~/lib/hocs/withLink';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import { GET_ONE_NEWS } from '~/lib/graphql/news.strings';
import Error from '~/pages/_error';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  backlink2: {
    display: 'inline-flex',
    padding: theme.spacing(2),
  },
  paragraph: { margin: theme.spacing(2.5, 0) },
}));

const NewsId = ({ news, statusCode }) => {
  const classes = useStyles();
  const { STRINGS } = useContext(TranslationsContext).state;

  if (!news) return <Error statusCode={statusCode} />;

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography gutterBottom component="p" variant="overline">
        {/* TODO: Make this dynamic somehow */}
        {new Date(news.createdAt).toLocaleDateString('ro-RO', {
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Typography>
      <Typography gutterBottom variant="h2">
        {news.title}
      </Typography>
      <Box mt={2} mb={3}>
        <img src={news.images[0]} alt="" />
        <div className={classes.paragraph}>{parse(news.richContent)}</div>
        <img src={news.images[1]} alt="" />
      </Box>
      <Divider light={true} />
      <Link className={classes.backlink2} href="/news" color="primary">
        {STRINGS.NEWS_BACK_TO_NEWS}
      </Link>
      {/* TODO: Implement share to social media */}
      {/* <Button variant="text" color="primary">
        <ShareIcon /> _SHARE
      </Button> */}
    </Container>
  );
};

NewsId.getInitialProps = async ctx => {
  const { query, apolloClient, res } = ctx;
  const result = await apolloClient.query({ query: GET_ONE_NEWS, variables: { idOrSlug: query.id } });
  if (!result.data.oneNews) res.statusCode = 404;

  return { news: result.data.oneNews, statusCode: res.statusCode };
};

NewsId.Layout = WebsiteHeaderLayout;
export default withApollo(NewsId);
