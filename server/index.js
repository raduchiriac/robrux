const dev = process.env.NODE_ENV !== 'production';
if (dev) require('dotenv').config();
const express = require('express');
const next = require('next');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('./_helpers/passport');

const app = next({
  dev,
  quiet: !dev,
});

app.prepare().then(() => {
  const server = express();

  // Start MongoDB, then Express
  const initDBConnection = require('./_helpers/db').initDBConnection;
  initDBConnection(process.env.MONGO_URI, () => {
    const errorHandler = require('./_helpers/error-handler');
    const validateTokensMiddleware = require('./_helpers/auth/validateTokensMiddleware');
    server.use(errorHandler);
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(cors({ origin: `${process.env.HOSTNAME}:${process.env.PORT}`, credentials: true }));
    server.use(cookieParser());
    server.use(validateTokensMiddleware);

    // TODO: Do we still need this?
    // server.use((req, res, next) => {
    //   // Use cookie parser to populate current user
    //   const { token } = req.cookies;

    //   if (token) {
    //     try {
    //       // put the userId onto the req for future requests to access
    //       const { id } = jwt.verify(token, process.env.JWT_SECRET);
    //       req.userId = id;
    //       console.log('🚨[server.use] Setting userId from "token" in the req.userId:', id);
    //     } catch (err) {
    //       // Error verifing the token (err.message)
    //     }
    //   }
    //   next();
    // });

    const apollo = require('./_helpers/apollo');
    apollo.applyMiddleware({
      app: server,
      cors: false,
      path: process.env.GRAPHQL_ROUTE,
    });

    // Sessions allow us to store data on visitors from request to request
    const store = new MongoDBStore({
      uri: process.env.MONGO_URI,
      collection: 'sessions',
    });
    store.on('error', function(error) {
      console.log(`🚨MongoDBStore error: ${JSON.stringify(error)}`);
    });

    // server.use(
    //   session({
    //     secret: process.env.SESS_SECRET,
    //     cookie: {
    //       maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    //     },
    //     store,
    //     resave: true,
    //     saveUninitialized: true,
    //   })
    // );

    const handleNextRequests = app.getRequestHandler();
    server.use(passport.initialize());
    server.use(passport.session());
    require('./_helpers/routes')(server, passport);
    server.get('*', (req, res) => {
      const { parse } = require('url');
      return handleNextRequests(req, res, parse(req.url, true));
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
