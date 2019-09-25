import React from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css';

const NO_IMG = require('../../../Assets/imgs/no_img.svg');

const Flashcard = ({ data }) => {
  const { word, url } = data;

  const isImgAvailable = (url[0] === 'No Img Available' || url[0] === '');
  const renderImages = (url.map((item, ind) => (<img key={ind} className="flashcard_img--small" src={item} alt="" />)));
  const renderNoImage = (<img className="flashcard_img" src={NO_IMG} alt="no Word Preview" />);

  return (
    <div className="flashcard_container">
      <h3 className="flashcard_title">{ word }</h3>
      <div className="flashcard_imgContainer">
        {isImgAvailable ? renderNoImage : renderImages}
      </div>
    </div>
  );
};

Flashcard.propTypes = {
  data: PropTypes.shape({
    word: PropTypes.string,
    url: PropTypes.arrayOf(PropTypes.string),
  }),
};

Flashcard.defaultProps = {
  data: {
    word: '(no word)',
    url: ['No Img Available'],
  },
};

export default Flashcard;
