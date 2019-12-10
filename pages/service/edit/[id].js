import React from 'react';
import withApollo from '~/lib/hocs/withApollo';

const ServiceEdit = props => {
  return <div>ServiceEdit: {props.params.idOrSlug}</div>;
};

ServiceEdit.getInitialProps = async ({ query: { id } }, res) => {
  return { params: { idOrSlug: id } };
};

export default withApollo(ServiceEdit);
