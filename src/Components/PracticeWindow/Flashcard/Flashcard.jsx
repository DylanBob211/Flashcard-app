import React from 'react';
import PropTypes from 'prop-types';

const NO_IMG = require('../../../Assets/imgs/no_img.svg');

const Flashcard = ({ data }) => {
  const { word, url } = data[0];

  const renderImg = () => {
    if (url[0] === 'No Img Available' || url[0] === '') {
      return <img className="wordPreview_img--small" src={NO_IMG} alt="no Word Preview" />;
    }
    return (
      <div className="wordPreview_imgContainer">
        {url.map((itemUrl, ind) => (<img key={`${ind}-${itemUrl}`} className="wordPreview_img--small" src={itemUrl} alt="preview of pictures about this word" />))}
      </div>
    );
  };

  return (
    <>
      <h3 className="wordPreview_title">{ word }</h3>
      {renderImg()}
    </>
  );

};

Flashcard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
    url: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default Flashcard;
