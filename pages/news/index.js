import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
  },
}));

const News = () => {
  const classes = useStyles();

  const Router = useRouter();

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <CardActionArea onClick={() => Router.push('/news/slug')}>
          <CardMedia
            component="img"
            alt="Contemplative"
            height="160"
            image="https://images.unsplash.com/photo-1576233039123-3d54ecd0a312?q=20&w=600"
            title="Contemplative"
          />
          <CardContent>
            <Typography variant="caption" gutterBottom>
              2 weeks ago
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Chris-mas
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Festive decor for throughout the home, impress the relitives this year at The Range.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href="/news/slug">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardActionArea onClick={() => Router.push('/news/slug')}>
          <CardMedia
            component="img"
            alt="Contemplative"
            height="160"
            image="https://images.unsplash.com/photo-1576212767334-f9d27ad8e546?q=20&w=600"
            title="Contemplative"
          />
          <CardContent>
            <Typography variant="caption" gutterBottom>
              one month ago
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Pine Pin
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              A pine is any conifer in the genus Pinus of the family Pinaceae. Pinus is the sole genus in the subfamily
              Pinoideae.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href="/news/slug">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

News.Layout = WebsiteHeaderLayout;

export default News;
