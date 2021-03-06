import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import moment from 'moment';
import 'moment/locale/ro';
import withApollo from '~/lib/hocs/withApollo';
import Link from '~/lib/hocs/withLink';
import { WebsiteHeaderAndFooterLayout } from '~/lib/layouts/WebsiteHeaderAndFooterLayout';
import { GlobalContext } from '~/lib/contexts/GlobalContext';
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
  const { USER_LANG, STRINGS } = useContext(GlobalContext).state;
  moment.locale(USER_LANG);

  if (!news) return <Error statusCode={statusCode} />;

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Helmet title={news.title} />

      <Typography gutterBottom component="p" variant="overline">
        {moment(news.createdAt).format('LL')}
      </Typography>
      <Typography gutterBottom variant="h2">
        {news.title}
      </Typography>
      <Box mt={2} mb={3}>
        <img src={news.images[0]} alt="" />
        <div className={classes.paragraph}>{parse(news.richContent)}</div>
        <img src={news.images[1]} alt="" />
      </Box>
      <Divider light />
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

NewsId.getInitialProps = async ({ query, apolloClient, res = {} }) => {
  const result = await apolloClient.query({ query: GET_ONE_NEWS, variables: { idOrSlug: query.id } });
  let statusCode = (res && res.statusCode) || 200;
  if (!result.data.oneNews) statusCode = 404;

  return { news: result.data.oneNews, statusCode };
};

NewsId.Layout = WebsiteHeaderAndFooterLayout;
export default withApollo(NewsId);
