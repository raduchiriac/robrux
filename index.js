if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const { StaticApp } = require('@keystonejs/app-static');

const { staticRoute, staticPath, distDir } = require('./keystone/config');
const { User, Article } = require('./keystone/models/_schema');

const keystone = new Keystone({
  name: '',
  adapter: new MongooseAdapter({ mongoUri: process.env.MONGO_URI_TEMP }),
  onConnect: async () => {
    // TODO: This is only for demo purposes and should not be used in production
    const users = await keystone.lists.User.adapter.findAll();
    if (!users.length) {
      const initialData = require('./keystone/seed');
      await keystone.createItems(initialData);
    }
  },
});

keystone.createList('User', User);
keystone.createList('Article', Article);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

const adminApp = new AdminUIApp({
  adminPath: '/admin',
  hooks: require.resolve('./keystone/admin-ui/'),
  authStrategy,
  isAccessAllowed: ({ authentication: { item: user } }) => !!user && !!user.isAdmin,
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: staticRoute, src: staticPath }),
    adminApp,
    new NextApp({ dir: 'src' }),
  ],
  distDir,
};
