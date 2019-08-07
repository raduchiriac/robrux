require('dotenv').config();
const express = require('express');
const next = require('next');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

require('./_helpers/passport');
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

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
    server.use(cors());

    server.listen(process.env.PORT, () => {
      server.use('/graphql', require('./_helpers/graphql'));

      // Sessions allow us to store data on visitors from request to request
      const store = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions',
      });
      store.on('error', function(error) {
        console.log(error);
      });

      server.use(
        session({
          secret: process.env.SECRET,
          cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
          },
          store,
          resave: true,
          saveUninitialized: true,
        })
      );

      server.use(passport.initialize());
      server.use(passport.session());
      require('./_helpers/routes')(server, passport);

      const handle = app.getRequestHandler();
      server.get('*', (req, res) => {
        return handle(req, res);
      });

      // Did you run the seed command?
      if (process.env.SEED === 'true') {
        const seed = require('./seed');
      }

      console.log(`[✓] Server listening on port: ${process.env.PORT}`);
    });
  });
});
