import { FC, useState } from 'react';
import { Button } from '../../atoms';
import { AudioButton } from '../../molecules/AudioButton';
import axios from '../../../axios';

import styles from './WordCard.module.css';
import { useAuthStore } from '../../../core/store/auth-store';

export interface ITranslatedWord {
  word: string;
  phonetic: string;
  phoneticLink: string;
  meanings: Array<{
    antonyms: string[];
    partOfSpeech: string;
    synonyms: string[];
    definitions: Array<{ definition: string }>;
  }>;
  handleFindWord: (word: string) => void;
}

const createListOfItems = (
  title: string,
  listItems: string[],
  handleFindWord: (word: string) => void,
) => (
  <div className={styles.wordsListContainer}>
    <span>{title}</span>
    <ul className={styles.wordsList}>
      {listItems.map((item, idx) => (
        <li
          key={`${item}-${idx}`}
          className={styles.wordsListItem}
          onClick={() => handleFindWord(item)}
        >{`${item}${idx !== listItems.length - 1 ? ',' : ''}`}</li>
      ))}
    </ul>
  </div>
);

export const WordCard: FC<ITranslatedWord> = ({
  meanings,
  phonetic,
  word,
  phoneticLink,
  handleFindWord,
}) => {
  const [isWordAddedToDictionary, setWordAddedToDictionary] = useState(false);
  const { isAuthorized } = useAuthStore();

  const addWordToDictionary = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: '/dictionary',
        data: {
          word,
          meaning: meanings[0] ? meanings[0].definitions[0].definition : '',
        },
      });
      if (response) {
        setWordAddedToDictionary(true);
      }
    } catch {}
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerWord}>{word}</h2>
        </div>

        <AudioButton audioSrc={phoneticLink} text={phonetic} />
      </div>
      <div className={styles.addWord}>
        {isWordAddedToDictionary ? (
          <div>Word added to Dictionary</div>
        ) : isAuthorized ? (
          <Button onClick={addWordToDictionary}>Add word to Dictionary</Button>
        ) : null}
      </div>
      {meanings.map(item => (
        <div className={styles.contentContainer}>
          <div className={styles.partOfSpeech} key={`${item}-part-of-speech`}>
            {item.partOfSpeech}
          </div>
          <div className={styles.meanings}>
            <ol className={styles.list}>
              {item.definitions.map(({ definition }, definitionIdx) => (
                <li key={`${definition}-${definitionIdx}`}>{`${
                  definitionIdx + 1
                }. ${definition}`}</li>
              ))}
            </ol>
            {item.antonyms.length > 0 &&
              createListOfItems('antonyms', item.antonyms, handleFindWord)}
            {item.synonyms.length > 0 &&
              createListOfItems('synonyms', item.synonyms, handleFindWord)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordCard;
