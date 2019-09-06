import React from 'react';
import PropTypes from 'prop-types';
import './FlashcardPreview.css';

const noImg = require('../../../Assets/imgs/no_img.svg');

const FlashcardPreview = ({ imgUrls, toggleVisibility, name }) => {
  const dinamicStyle = {
    visibility: toggleVisibility ? 'visible' : 'hidden',
    transition: toggleVisibility ? '.5s all 1s' : '.3s all',
    transform: toggleVisibility ? 'scaleZ(1) translate(0%, -101%)' : 'scaleZ(0) translate(10%, -101%)',
    transformOrigin: 'top',
    opacity: toggleVisibility ? '0.9' : '0.2',
  };

  const isImgAvailable = (imgUrls[0] === 'No Img Available' || imgUrls[0] === '');
  const renderImages = (imgUrls.map((url, ind) => (<img key={ind} className="wordPreview_img--small" src={url} alt="" />)));
  const renderNoImage = (<img className="wordPreview_img" src={noImg} alt="no Word Preview" />);

  return (
    <div className="wordPreview_container" style={dinamicStyle}>
      <h3 className="wordPreview_title">{ name }</h3>
      <div className="wordPreview_imgContainer">
        {isImgAvailable ? renderNoImage : renderImages}
      </div>
    </div>
  );
};

FlashcardPreview.propTypes = {
  name: PropTypes.string,
  imgUrls: PropTypes.arrayOf(PropTypes.string),
  toggleVisibility: PropTypes.bool,
};

FlashcardPreview.defaultProps = {
  name: '',
  imgUrls: ['No Img Available'],
  toggleVisibility: false,
};

export default FlashcardPreview;
