import React from 'react';
import PropTypes from 'prop-types';

const Flashcard = () => ({ lists }) => {
  
  
  
  // const renderImg = () => {
  //   if (urls[0] === 'No Img Available' || urls[0] === '') {
  //     return <img className="wordPreview_img" src={require('../../../Assets/imgs/no_img.svg')} alt="no Word Preview" />;
  //   }
  //   return (
  //     <div className="wordPreview_imgContainer">
  //       {urls.map((url, ind) => (<img key={ind} className="wordPreview_img--small" src={url} alt="preview of pictures about this word" />))}
  //     </div>
  //   );
  // };

  // return (
  //   <div className="wordPreview_container">
  //     <h3 className="wordPreview_title">{ name }</h3>
  //     {renderImg()}
  //   </div>
  // );
  return (<div>helloworld</div>)
};

Flashcard.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        url: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  })).isRequired,
};

export default Flashcard;
