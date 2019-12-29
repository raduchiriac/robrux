import React, { Fragment } from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import Typography from '@material-ui/core/Typography';

const TermsRO = () => {
  return (
    <Fragment>
      {[...new Array(50)].map((el, idx) => (
        <Typography
          key={`p${idx}`}
          component="p"
          paragraph
        >{`Lorem cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
        eget quam.

        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et.`}</Typography>
      ))}
    </Fragment>
  );
};

TermsRO.Layout = WebsiteHeaderLayout;
export default withApollo(TermsRO);
