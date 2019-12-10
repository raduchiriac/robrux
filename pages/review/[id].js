import React from 'react';
import withApollo from '~/lib/hocs/withApollo';

const Rating = props => {
  return <div>Give a Rating: {props.params.idOrSlug}</div>;
};

Rating.getInitialProps = async ({ query: { id } }, res) => {
  return { params: { idOrSlug: id } };
};

export default withApollo(Rating);
