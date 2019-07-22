import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Flashcard = ({ wordData }) => {

  const { word, url } = wordData[0];

  const renderImg = () => {
    if (url[0] === 'No Img Available' || url[0] === '') {
      return <img className="wordPreview_img--small" src={require('../../../Assets/imgs/no_img.svg')} alt="no Word Preview" />;
    }
    return (
      <div className="wordPreview_imgContainer">
        {url.map((url, ind) => (<img key={ind} className="wordPreview_img--small" src={url} alt="preview of pictures about this word" />))}
      </div>
    );
  };

  return (
    <div className="practiceWindow_container">
      <h3 className="wordPreview_title">{ word }</h3>
      {renderImg()}
    </div>
  );

};

// Flashcard.propTypes = {
//   lists: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string,
//     name: PropTypes.string,
//     words: PropTypes.arrayOf(
//       PropTypes.shape({
//         word: PropTypes.string,
//         url: PropTypes.arrayOf(PropTypes.string),
//       }),
//     ),
//   })).isRequired,
// };

export default Flashcard;
