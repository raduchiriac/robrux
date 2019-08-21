import { WithHeaderLayout } from '../../lib/layouts/WithHeaderLayout';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Service = ({ service }) => {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} sm={4} md={4} lg={3}>
        <Paper>Map</Paper>
        <Paper>Address: Rue 21 Bruxelles</Paper>
        <Paper>Reviews</Paper>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={9}>
        <Paper>
          <h1>Title magic carpet maker</h1>
        </Paper>
        <Paper>
          <img src="/static/brux-full.jpg" alt="" />
        </Paper>
        <Paper>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis delectus minima velit assumenda, quaerat
          obcaecati, recusandae dolorum corrupti repellat id aspernatur facere. A numquam quasi ipsa beatae culpa,
          necessitatibus suscipit.
        </Paper>
        <Paper>
          <button>Buy</button>
        </Paper>
      </Grid>
    </Grid>
  );
};

Service.getInitialProps = async ({ query: { id } }, res) => {
  return { service: { idOrSlug: id } };
};

Service.Layout = WithHeaderLayout;

export default Service;
