if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const next = require('next');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const jwt = require('jsonwebtoken');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

require('./_helpers/passport');
const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev,
  quiet: !dev,
  conf: withImages(
    withSass({
      env: {
        GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
        GRAPHQL_ROUTE: process.env.GRAPHQL_ROUTE,
      },
    })
  ),
});

app.prepare().then(() => {
  const server = express();

  // Start MongoDB and Express
  const initDBConnection = require('./_helpers/db').initDBConnection;
  initDBConnection(process.env.MONGO_URI, () => {
    const errorHandler = require('./_helpers/error-handler');
    server.use(errorHandler);
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(cookieParser());

    // Use cookie parser to populate current user
    server.use((req, res, next) => {
      const { token } = req.cookies;

      if (token) {
        try {
          // put the userId onto the req for future requests to access
          const { id } = jwt.verify(token, process.env.JWT_SECRET);
          req.userId = id;
          console.log('🚨[server.use] Setting userId from "token" in the req.userId:', id);
        } catch (err) {
          // Error verifing the token (err.message)
        }
      }
      next();
    });

    server.use(cors());

    const apollo = require('./_helpers/apollo');
    apollo.applyMiddleware({
      app: server,
      path: process.env.GRAPHQL_ROUTE,
      cors: { origin: `${process.env.HOSTNAME}:${process.env.PORT}`, credentials: true },
    });

    // Sessions allow us to store data on visitors from request to request
    const store = new MongoDBStore({
      uri: process.env.MONGO_URI,
      collection: 'sessions',
    });
    store.on('error', function(error) {
      console.log(`🚨MongoDBStore error: ${JSON.stringify(error)}`);
    });

    server.use(
      session({
        secret: process.env.SESS_SECRET,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
        store,
        resave: true,
        saveUninitialized: true,
      })
    );

    const handle = app.getRequestHandler();
    server.use(passport.initialize());
    server.use(passport.session());
    require('./_helpers/routes')(server, passport);
    server.get('*', (req, res) => {
      const { parse } = require('url');
      return handle(req, res, parse(req.url, true));
    });

    server.listen(process.env.PORT, () => {
      // Did you run the seed command?
      if (process.env.SEED === 'true' && dev) {
        const seed = require('./seed');
      }

      console.log(`[✓] Server listening on port: ${process.env.PORT}`);
    });
  });
});
