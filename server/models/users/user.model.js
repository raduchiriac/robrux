const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');

const STRINGS = require('../../_helpers/i18n');
const { randomStringGenerator } = require('../../_helpers/utils');

const dummyForgotGenerator = () => {
  const forgotCode = randomStringGenerator(3);

  // You have 10 minutes to change your password
  const now = new Date();
  const forgotCodeLimit = now.setMinutes(now.getMinutes() + 10);

  return { forgotCode, forgotCodeLimit };
};

const schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      set: v => v.toLowerCase(),
      validate: [validate({ validator: 'isEmail', message: '_VALID_EMAIL' })],
      required: '_SUPPLY_AN_EMAIL',
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      validate: [
        validate({
          validator: 'isLength',
          arguments: [3, 50],
          message: '_F_BETWEEN_{ARGS[0]}_{ARGS[1]}_CHARS',
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
          message: '_L_BETWEEN_{ARGS[0]}_{ARGS[1]}_CHARS',
        }),
      ],
    },
    role: { type: String, enum: ['admin', 'user', 'pro', 'blocked'], default: 'user' },
    validated: { type: Boolean, default: false },
    _gigs: { type: [ObjectId] },
    validationCode: {
      index: true,
      type: String,
      default: () => randomStringGenerator(2),
      unique: true,
    },
    avatar: { type: String, default: 'avatars/male2.svg' },
    phone: { type: String },
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
schema.plugin(uniqueValidator, { message: '_{PATH}_TO_BE_UNIQUE' });

const User = mongoose.model('User', schema);

// -----------------------------------------------------------
// GraphQL declarations
// -----------------------------------------------------------
const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLList } = require('graphql');

const fieldsInputLogin = {
  email: { type: GraphQLNonNull(GraphQLString) },
  password: { type: GraphQLNonNull(GraphQLString) },
};
const fieldsAuth = {
  _id: { type: GraphQLID },
  email: { type: GraphQLNonNull(GraphQLString) },
};
const fieldsInputRegister = Object.assign({}, fieldsInputLogin, {
  confirmPassword: { type: GraphQLNonNull(GraphQLString) },
  firstName: { type: GraphQLNonNull(GraphQLString) },
  lastName: { type: GraphQLNonNull(GraphQLString) },
});
const fields = Object.assign({}, fieldsInputRegister, {
  _id: { type: GraphQLID },
  _gigs: { type: GraphQLList(GraphQLID) },
  avatar: { type: GraphQLString },
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
