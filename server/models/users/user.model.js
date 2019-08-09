const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const dummyRandomGenerator = (loops = 1, prefix = '') => {
  return [...Array(loops)].reduce(
    (t, acc) =>
      t +
      Math.random()
        .toString(36)
        .replace('0.', ''),
    prefix
  );
};

const dummyForgotGenerator = () => {
  const forgotCode = dummyRandomGenerator(3);

  // You have 10 minutes to change your password
  const now = new Date();
  const forgotCodeLimit = now.setMinutes(now.getMinutes() + 10);

  return { forgotCode, forgotCodeLimit };
};

const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = require('graphql');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    validate: [validate({ validator: 'isEmail', message: 'Please enter a valid email address' })],
    required: 'Please supply an email address',
  },
  firstName: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Should be between {ARGS[0]} and {ARGS[1]} characters',
      }),
    ],
  },
  lastName: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Should be between {ARGS[0]} and {ARGS[1]} characters',
      }),
    ],
  },
  role: { type: String, enum: ['admin', 'user', 'pro', 'deleted'], default: 'user' },
  validated: { type: Boolean, default: false },
  validationCode: {
    index: true,
    type: String,
    default: () => dummyRandomGenerator(2),
    unique: true,
  },
  phone: { type: String },
  forgotCode: { type: String },
  forgotCodeLimit: { type: Date },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

schema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'Email already exists',
  },
});
schema.plugin(mongodbErrorHandler);

const User = mongoose.model('User', schema);

// -----------------------------------------------------------
// GraphQL declarations
// -----------------------------------------------------------
const fieldsInputLogin = {
  email: { type: GraphQLString },
  password: { type: GraphQLString },
};
const fieldsInputRegister = Object.assign({}, fieldsInputLogin, {
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
});
const fields = Object.assign({}, fieldsInputRegister, {
  _id: { type: GraphQLID },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type definition',
  fields,
});

module.exports = { User, UserType, fieldsInputLogin, fieldsInputRegister };
