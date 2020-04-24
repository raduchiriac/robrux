// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';

const NextComposed = forwardRef(function NextComposed(props, ref) {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other}></a>
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function MuiLink(props) {
  const { activeClassName = 'active', className: classNameProps, innerRef, naked, ...other } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]: router ? router.pathname === props.href && activeClassName : '',
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return <Link component={NextComposed} className={className} ref={innerRef} {...other} />;
}

MuiLink.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

export default forwardRef((props, ref) => <MuiLink {...props} innerRef={ref} />);
