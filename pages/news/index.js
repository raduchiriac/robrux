import React, { useContext } from 'react';
import moment from 'moment';
import 'moment/locale/ro';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import { GET_NEWS } from '~/lib/graphql/news.strings';
import { withApollo } from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
  },
}));

const News = props => {
  const classes = useStyles();
  const { news } = props;
  const Router = useRouter();
  const { STRINGS } = useContext(LanguagesContext).state;

  // TODO: Make this dynamic somehow (and set it globally, once in a HOC)
  moment.locale('ro');

  return (
    <Container maxWidth="sm">
      {!news.length && <Typography variant="body1">{STRINGS.NEWS_NO_NEWS}</Typography>}

      {news.map((oneNews, idx) => (
        <Card key={`news${idx}`} className={classes.card}>
          <CardActionArea onClick={() => Router.push(`/news/${oneNews.slug}`)}>
            <CardMedia component="img" alt="" height="170" image={oneNews.images[0]} title="" />
            <CardContent>
              <Typography variant="caption" gutterBottom>
                {moment(oneNews.createdAt).fromNow()}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {oneNews.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                {oneNews.excerpt}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" href={`/news/${oneNews.slug}`}>
              {STRINGS.NEWS_LEARN_MORE}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

News.Layout = WebsiteHeaderLayout;

News.getInitialProps = async ({ apolloClient }) => {
  const result = await apolloClient.query({ query: GET_NEWS });
  return { news: result.data.news };
};

export default withApollo(News);
