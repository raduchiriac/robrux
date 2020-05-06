const { Virtual, Uuid, File, Text, Relationship, Select, Password, Checkbox } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { atTracking } = require('@keystonejs/list-plugins');
const { staticRoute, staticPath } = require('../config');

const avatarFileAdapter = new LocalFileAdapter({
  src: `${staticPath}/avatars`,
  path: `${staticRoute}/avatars`,
});

exports.User = {
  fields: {
    name: {
      type: Virtual,
      resolver: item => `${item.firstName} ${item.lastName}`,
    },
    firstName: { type: Text, isRequired: true },
    lastName: { type: Text, isRequired: true },
    email: { type: Text, isUnique: true, isRequired: true },
    password: { type: Password, isRequired: true },
    isAdmin: { type: Checkbox, label: 'Has admin rights?' },
    avatar: { type: File, adapter: avatarFileAdapter },
    validationCode: { type: Uuid },
    forgotCode: { type: Uuid },
    // phone: { type: Text },
    // gigs: { type: Text },
    // role: { type: Select, enum: ['admin', 'user', 'pro', 'blocked'], default: 'user' },
    // validated: { type: Text },
    // forgotCodeLimit: { type: Date },
  },
  hooks: {},
  plugins: [atTracking()],
  adminConfig: {
    defaultPageSize: 20,
  },
  labelResolver: item => `${item.email}`,
};
