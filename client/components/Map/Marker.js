import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import THEME from '../../__TEMP/_constants/theme';

const Wrapper = styled.div`
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: ${THEME.alternateColor};
  border: 3px solid #fff;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    background-color: #000;
    z-index: 1;
  }
`;

const Marker = props => <Wrapper title={props.text} {...(props.onClick ? { onClick: props.onClick } : {})} />;

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
