import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paragraph: { margin: `${theme.spacing(2)}px 0` },
  gridList: { maxWidth: 400, margin: '0 auto' },
}));

const NewsId = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography gutterBottom variant="h2">
        Aliquam mae egestas velit, id suscipit risus
      </Typography>
      <Typography gutterBottom component="p" variant="overline" className={classes.paragraph}>
        {Date().toString()}
      </Typography>
      <Typography gutterBottom variant="subtitle2" className={classes.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec consequat ipsum. Etiam dignissim eros
        tortor, sit amet tempus orci blandit eget. Donec vulputate sem id purus vestibulum, quis dapibus quam tempus.
        Nulla facilisi. Duis fermentum molestie consequat. Curabitur elementum iaculis molestie. Sed lacinia maximus
        nisl, eget dapibus odio. Donec gravida sem purus.
      </Typography>
      <img src="https://images.unsplash.com/photo-1576233039123-3d54ecd0a312?q=40&w=900" alt="" />
      <Box mt={2} mb={3}>
        <p className={classes.paragraph}>
          Aliquam volutpat egestas velit, id suscipit risus malesuada a. In in augue risus. Duis finibus mauris ut
          hendrerit auctor. Pellentesque sagittis est est, eu varius tellus auctor ut. Morbi vitae quam eget turpis
          sagittis suscipit. Vivamus egestas sit amet enim ut facilisis. Donec et enim eu velit condimentum venenatis.
          Aliquam mollis porttitor lorem, at mollis metus vulputate id. Pellentesque id quam est. Nunc tincidunt
          tristique nibh ac malesuada. Sed cursus ultricies enim et suscipit. Nunc efficitur arcu ipsum, id maximus
          velit cursus id. Maecenas ut lorem massa.
        </p>
        <p className={classes.paragraph}>
          Suspendisse potenti. Vestibulum purus mauris, lacinia eu augue ac, hendrerit ultricies nunc. Mauris libero
          risus, iaculis sed mauris eget, vehicula posuere nulla. Mauris fermentum felis et tellus venenatis posuere
          eget sit amet metus. Sed orci lectus, feugiat a dignissim vitae, convallis id libero. In id lectus at odio
          convallis ullamcorper a sed nisl. Cras suscipit magna nisi, id tristique lectus cursus quis. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis est quis
          tortor porttitor egestas. Nulla ornare dignissim convallis. Donec euismod, lectus eget luctus vestibulum,
          turpis magna congue nulla, eget bibendum diam nulla non purus. Quisque mattis, lacus in ultricies ullamcorper,
          ligula eros imperdiet purus, et elementum libero est quis eros. Curabitur a ante sem. Sed sit amet ante
          semper, luctus nunc nec, varius enim. Suspendisse potenti.
        </p>
        <Typography gutterBottom component="p" className={classes.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis, ante in hendrerit ornare, lorem tortor
          ultrices quam, sit amet ultrices metus massa non eros. In ac ex interdum, vestibulum tortor sit amet,
          elementum mi. Duis euismod orci quis pretium ultrices. Praesent convallis quam felis. Nunc facilisis lectus a
          eros scelerisque, quis pharetra ante commodo. Vestibulum ac magna nec velit aliquam tincidunt non sit amet
          eros. Curabitur at magna enim. Praesent luctus risus viverra est ullamcorper, et lacinia dui viverra. Aliquam
          pulvinar magna orci, sit amet iaculis purus placerat id. Ut vitae dolor aliquet, vehicula nunc at, gravida
          libero. Duis ipsum tellus, pellentesque dapibus ullamcorper aliquet, vulputate a purus. Cras sem enim,
          accumsan at orci in, dignissim pulvinar lorem.
        </Typography>
        <p className={classes.paragraph}>
          Vestibulum sed mi lorem. Vivamus molestie semper metus eget tempor. Suspendisse mi massa, placerat at
          fringilla nec, feugiat eu felis. Suspendisse finibus a arcu eu venenatis. Morbi condimentum nisl ligula, non
          hendrerit odio volutpat id. Ut a placerat lectus. Ut ut consectetur diam. Sed gravida pellentesque facilisis.
          Suspendisse sollicitudin mi sit amet porta vehicula. Nullam sit amet lorem eu elit ullamcorper bibendum. Etiam
          a porttitor lacus. Suspendisse eu rutrum mauris, eu mollis sapien. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Nulla facilisi. Pellentesque egestas metus vitae ante rutrum consequat. Donec a tincidunt
          tellus.
        </p>
      </Box>
      <Divider light={true} />
      <Button href="/news" variant="text" color="primary">
        <ArrowBackIcon /> _BACK_TO_NEWS
      </Button>
      <Button variant="text" color="primary">
        <ShareIcon /> _SHARE
      </Button>
    </Container>
  );
};

NewsId.Layout = WebsiteHeaderLayout;
export default withApollo(NewsId);
