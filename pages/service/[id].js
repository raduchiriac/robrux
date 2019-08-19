const Service = ({ service }) => <div>{service.id}</div>;

Service.getInitialProps = async ({ query: { id } }, res) => {
  return { service: { id } };
};

export default Service;
