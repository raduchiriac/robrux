const { File, Text, Slug, Relationship, Select } = require('@keystonejs/fields');
const { Markdown } = require('@keystonejs/fields-markdown');
const { atTracking } = require('@keystonejs/list-plugins');

const strippedString = require('../lib/utils').strippedString;
const markdownConverter = require('../lib/utils').markdownConverter;

exports.Article = {
  fields: {
    title: { type: Text, isRequired: true, isUnique: true },
    slug: {
      type: Slug,
    },
    content: { type: Markdown },
    richContent: {
      type: Text,
      label: 'Content (converted)',
      isMultiline: true,
    },
    excerpt: {
      type: Text,
    },
    // images: { type: File },
    // author: {},
    status: {
      type: Select,
      isRequired: true,
      dataType: 'string',
      defaultValue: 'draft',
      options: ['draft', 'live', 'archived'],
    },
  },
  hooks: {
    resolveInput: async ({ resolvedData, existingItem, context, originalInput, actions, operation }) => {
      if (resolvedData.content) {
        resolvedData.richContent = markdownConverter.makeHtml(resolvedData.content);
        resolvedData.excerpt = strippedString(resolvedData.richContent).substring(0, 100) + '…';
        resolvedData.wysiwyg = resolvedData.richContent;
      }
      return resolvedData;
    },
    validateInput: async (...args) => {
      // console.log('-------validateInput', args);
    },
    beforeChange: async (...args) => {
      // console.log('-------beforeChange', args);
    },
    afterChange: async (...args) => {
      // console.log('-------afterChange', args);
    },
  },
  plugins: [atTracking()],
  labelResolver: item => `${item.title}`,
  queryLimits: {
    // maxResults: 10,
  },
  adminConfig: {
    defaultColumns: 'title, slug, status',
    defaultPageSize: 20,
  },
};
