import React from 'react';
import PropTypes from 'prop-types';

const PlusIcon = ({
  className, ...props
}) => (
  <svg className={`icon ${className}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
  </svg>
);

PlusIcon.propTypes = {
  className: PropTypes.string,
};

PlusIcon.defaultProps = {
  className: '',
};
export default PlusIcon;
