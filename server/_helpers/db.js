const mongoose = require('mongoose');

module.exports = {
  initDBConnection: (MONGODB_URI, callback) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', function(err) {
      console.log('[☆] Failed to connect to database:', err);
      process.exit(1);
    });

    db.once('open', function() {
      console.log('[★] Connected to MongoDB');
      callback();
    });
  },
};
