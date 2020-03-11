import React, { Fragment } from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderFooterLayout } from '~/lib/layouts/WebsiteHeaderFooterLayout';
import Typography from '@material-ui/core/Typography';

const PrivacyRO = () => {
  return (
    <Fragment>
      {[...new Array(50)].map((el, idx) => (
        <Typography
          key={`p${idx}`}
          component="p"
          paragraph
        >{`Privacy cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
        eget quam.

        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et.`}</Typography>
      ))}
    </Fragment>
  );
};

PrivacyRO.Layout = WebsiteHeaderFooterLayout;
export default withApollo(PrivacyRO);
