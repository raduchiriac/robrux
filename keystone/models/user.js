const { File, Text, Slug, Relationship, Select, Password, Checkbox, CalendarDay, DateTime } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { atTracking } = require('@keystonejs/list-plugins');
const { staticRoute, staticPath, distDir } = require('../config');

const avatarFileAdapter = new LocalFileAdapter({
  src: `${staticPath}/avatars`,
  path: `${staticRoute}/avatars`,
});

exports.User = {
  fields: {
    name: { type: Text, label: 'Username' },
    firstName: { type: Text, isRequired: true },
    lastName: { type: Text, isRequired: true },
    email: { type: Text, isUnique: true, isRequired: true },
    password: { type: Password, isRequired: true },
    isAdmin: { type: Checkbox, label: 'Is Admin?' },
    avatar: { type: File, adapter: avatarFileAdapter },
    // gigs: { type: Text },
    // role: { type: String, enum: ['admin', 'user', 'pro', 'blocked'], default: 'user' },
    // validated: {}
    // validationCode
    // phone: { type: String },
    // forgotCode: { type: String },
    // forgotCodeLimit: { type: Date },
  },
  hooks: {},
  plugins: [atTracking()],
  labelResolver: item => `${item.email}`,
};
