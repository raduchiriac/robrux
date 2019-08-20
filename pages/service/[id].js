import { WithHeaderLayout } from '../../lib/layouts/WithHeaderLayout';

const Service = ({ service }) => <div>idOrSlug: {service.idOrSlug}</div>;

Service.getInitialProps = async ({ query: { id } }, res) => {
  return { service: { idOrSlug: id } };
};

Service.Layout = WithHeaderLayout;

export default Service;
