import { Children } from 'react';
const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(Children.only(children)) : Children.only(children);

export default ConditionalWrap;
