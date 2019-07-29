import React from 'react';
import PropTypes from 'prop-types';

const PlayIcon = ({ classIcon, dependencies, customFunction }) => (
  <svg onClick={() => customFunction(dependencies)} className={classIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M3 22v-20l18 10-18 10z" />
  </svg>
);

PlayIcon.propTypes = {
  classIcon: PropTypes.string.isRequired,
  customFunction: PropTypes.func,
  dependencies: PropTypes.string,
};

PlayIcon.defaultProps = {
  customFunction: () => {},
  dependencies: null,
};
export default PlayIcon;
