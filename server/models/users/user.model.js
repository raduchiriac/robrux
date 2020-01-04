const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const STRINGS = require('../../_helpers/i18n');

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

const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      set: v => v.toLowerCase(),
      validate: [validate({ validator: 'isEmail', message: 'Please enter a valid email address' })],
      required: 'Please supply an email address',
    },
    firstName: {
      type: String,
      trim: true,
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
      trim: true,
      required: true,
      validate: [
        validate({
          validator: 'isLength',
          arguments: [3, 50],
          message: 'Should be between {ARGS[0]} and {ARGS[1]} characters',
        }),
      ],
    },
    role: { type: String, enum: ['admin', 'user', 'pro', 'blocked'], default: 'user' },
    validated: { type: Boolean, default: false },
    _gigs: { type: [ObjectId] },
    validationCode: {
      index: true,
      type: String,
      default: () => dummyRandomGenerator(2),
      unique: true,
    },
    bio: {
      avatar: { type: String },
      phone: { type: String },
    },
    forgotCode: { type: String },
    forgotCodeLimit: { type: Date },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);
schema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

schema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'Email already exists',
    IncorrectPasswordError: STRINGS['ro'].FORM_WRONG_EMAIL_USERNAME,
    IncorrectUsernameError: STRINGS['ro'].FORM_WRONG_EMAIL_USERNAME,
    MissingUsernameError: 'No email was given',
  },
  // findByUsername: function(model, queryParameters) {
  // queryParameters.validated = true;
  //   return model.findOne(queryParameters);
  // },
});
schema.plugin(mongodbErrorHandler);

const User = mongoose.model('User', schema);

// -----------------------------------------------------------
// GraphQL declarations
// -----------------------------------------------------------
const fieldsInputLogin = {
  email: { type: GraphQLNonNull(GraphQLString) },
  password: { type: GraphQLNonNull(GraphQLString) },
};
const fieldsAuth = {
  _id: { type: GraphQLID },
  email: { type: GraphQLNonNull(GraphQLString) },
};
const fieldsInputRegister = Object.assign(
  {},
  fieldsInputLogin,
  {
    confirmPassword: { type: GraphQLNonNull(GraphQLString) },
  },
  {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
  }
);
const fields = Object.assign({}, fieldsInputRegister, {
  _id: { type: GraphQLID },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type definition',
  fields,
});

const UserAuthType = new GraphQLObjectType({
  name: 'UserAuth',
  description: 'Auth token after loginUser',
  fields: fieldsAuth,
});

module.exports = { User, UserType, UserAuthType, fieldsInputLogin, fieldsInputRegister };
