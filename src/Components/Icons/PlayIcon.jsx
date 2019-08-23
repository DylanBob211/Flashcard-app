import React from 'react';
import PropTypes from 'prop-types';

const PlayIcon = ({
  className, ...props
}) => (
  <svg className={`icon ${className}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M3 22v-20l18 10-18 10z" />
  </svg>
);

PlayIcon.propTypes = {
  className: PropTypes.string,
  customFunction: PropTypes.func,
  dependencies: PropTypes.string,
};

PlayIcon.defaultProps = {
  className: '',
  customFunction: () => {},
  dependencies: null,
};
export default PlayIcon;
