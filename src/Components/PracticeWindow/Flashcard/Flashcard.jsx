import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Flashcard = ({ data }) => {
  const { word, url } = data[0];

  const renderImg = () => {
    if (url[0] === 'No Img Available' || url[0] === '') {
      return <img className="wordPreview_img--small" src={require('../../../Assets/imgs/no_img.svg')} alt="no Word Preview" />;
    }
    return (
      <div className="wordPreview_imgContainer">
        {url.map((itemUrl, ind) => (<img key={ind} className="wordPreview_img--small" src={itemUrl} alt="preview of pictures about this word" />))}
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
  wordData: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default Flashcard;
