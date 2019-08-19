const Service = ({ service }) => <div>idOrSlug: {service.idOrSlug}</div>;

Service.getInitialProps = async ({ query: { id } }, res) => {
  return { service: { idOrSlug: id } };
};

export default Service;
