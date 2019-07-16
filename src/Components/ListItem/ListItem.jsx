import React from 'react';
import WordItem from '../WordItem/WordItem';
import WordForm from '../WordForm/WordForm';
import './ListItem.css';
import TrashBinIcon from '../Icons/TrashBinIcon';
import PlayIcon from '../Icons/PlayIcon';


const ListItem = ({
  id, wordsArray, listName, deleteList, addWord, deleteWord
}) => {
  const listOfWords = wordsArray.map((word, index) => (
    <WordItem
      deleteWord={deleteWord}
      name={word.word}
      picUrls={word.url}
      key={index}
      id={id}
    />
  ));

  return (
    <div className="listItem_container">
      <ListHeader
        listName={listName}
        deleteList={deleteList}
      />
      <ul className="listItem_wordList">{ listOfWords }</ul>
      <WordForm
        addWord={addWord}
        id={id}
      />
    </div>
  );
};

const ListHeader = ({ listName, deleteList }) => (
  <div className="listItem_header_container">
    <h2 className="listItem_title">{ listName }</h2>
    <div className="listItem_iconbox">
      <TrashBinIcon function={deleteList} dependencies={listName} class="listItem_icon--trashbin" />
      <PlayIcon class="listItem_icon--play" />
    </div>
  </div>
);

export default ListItem;
