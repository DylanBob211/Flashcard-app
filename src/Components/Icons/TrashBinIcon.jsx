import React from 'react';
import PropTypes from 'prop-types';

const TrashBinIcon = ({
  classIcon, width, height, fill, iconTitle, dependencies, customFunction,
}) => (

  <svg
    className={classIcon}
    xmlns="http://www.w3.org/2000/svg"
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill={fill || '#000'}
    aria-labelledby={iconTitle}
    onClick={() => customFunction(dependencies)}
  >
    <title id={iconTitle}>TrashBin Icon</title>
    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
  </svg>
);

TrashBinIcon.propTypes = {
  classIcon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  iconTitle: PropTypes.string,
  customFunction: PropTypes.func,
  dependencies: PropTypes.string,
};

TrashBinIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff',
  iconTitle: 'trash bin',
  customFunction: () => {},
  dependencies: 'sth',
};
export default TrashBinIcon;
