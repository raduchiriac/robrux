const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

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
    required: 'Please supply an email address',
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
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
