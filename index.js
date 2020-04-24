const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const { StaticApp } = require('@keystonejs/app-static');

const { staticRoute, staticPath, distDir } = require('./keystone/config');
const { User, Post, PostCategory, Comment } = require('./keystone/schema');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const adapterConfig = { mongoUri: process.env.MONGO_URI_K };

const keystone = new Keystone({
  name: 'robrux keystone',
  adapter: new MongooseAdapter(adapterConfig),
  onConnect: async () => {
    // Initialise some data.
    // TODO: This is only for demo purposes and should not be used in production
    const users = await keystone.lists.User.adapter.findAll();
    if (!users.length) {
      const initialData = require('./keystone/seed-initial-data');
      await keystone.createItems(initialData);
    }
  },
});

keystone.createList('User', User);
// keystone.createList('Post', Post);
// keystone.createList('PostCategory', PostCategory);
// keystone.createList('Comment', Comment);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

const adminApp = new AdminUIApp({
  adminPath: '/admin',
  // hooks: require.resolve('./admin/'),
  authStrategy,
  isAccessAllowed: ({ authentication: { item: user } }) => !!user && !!user.isAdmin,
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    // new StaticApp({ path: staticRoute, src: staticPath }),
    adminApp,
    // new NextApp({ dir: 'app' })
  ],
  distDir,
};
