import { FC } from 'react';
import styles from './WordCard.module.css';

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
}

const createListOfItems = (title: string, listItems: string[]) => (
  <div>
    <span>{title}</span>
    <ul>
      {listItems.map((item, idx) => (
        <li key={`${item}-${idx}`}>{item}</li>
      ))}
    </ul>
  </div>
);

export const WordCard: FC<ITranslatedWord> = ({
  meanings,
  phonetic,
  word,
  phoneticLink,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerWord}>{word}</h2>
        </div>

        <span>{phonetic}</span>

        <audio
          controls
          style={{
            marginTop: 20,
          }}
        >
          <source src={phoneticLink} />
        </audio>
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
              createListOfItems('antonyms', item.antonyms)}
            {item.synonyms.length > 0 &&
              createListOfItems('synonyms', item.synonyms)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordCard;
