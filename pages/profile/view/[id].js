import React from 'react';
import { WebsiteHeaderAndFooterLayout } from '~/lib/layouts/WebsiteHeaderAndFooterLayout';
// import withApollo from '~/lib/hocs/withApollo';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
// import jwt from 'jsonwebtoken';
// import cookies from 'next-cookies';
// import { GET_USER_INFO } from '~/lib/graphql/user.strings';
// import Router, { useRouter } from 'next/router';

const SELF = 'myself';

const Profile = ({ data }) => {
  return (
    <Container>
      {data}
      <Avatar alt="Name" src="/avatars/user.svg" />
    </Container>
  );
};

// Profile.getInitialProps = async ({ query, apolloClient, res = {} }) => {
//   const { token } = cookies(res);
//   // const { _id } = token ? jwt.verify(token, process.env.JWT_SECRET) : { _id: undefined };
//   // const userToLookfor = _id || query.id;
//   // if (!userToLookfor) {
//   //   // Router.push({ pathname: '/login', query: { redirect: res?.req?.originalUrl } });
//   // }
//   // console.log(userToLookfor);
//   // const result = await apolloClient.query({ query: GET_USER_INFO, variables: { id: userToLookfor } });
//   // let statusCode = (res && res.statusCode) || 200;
//   // console.log(result);
//   // if (!result.data.oneNews) statusCode = 404;

//   return {};
// };

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: SELF } }],
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  return { props: { data: id } };
}

Profile.Layout = WebsiteHeaderAndFooterLayout;
export default Profile;
