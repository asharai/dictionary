import { useCallback, useEffect, useState } from 'react';
import axios from '../../../axios';

import styles from './Dictionary.module.css';

interface IDictionaryWord {
  word: string;
  meaning: string;
}

function DictionaryPage() {
  const [words, setWords] = useState<IDictionaryWord[]>([]);

  const getWords = useCallback(async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/dictionary',
      });
      console.log('res', response);
      setWords(response.data);
    } catch {}
  }, []);

  useEffect(() => {
    getWords();
  }, [getWords]);

  return (
    <div className={styles.container}>
      {words.length ? (
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div>Word</div>
            <div>Meaning</div>
          </li>
          {words.map(item => (
            <li className={styles.listItem} key={item.word}>
              <div>{item.word}</div>

              <div>{item.meaning}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Your dictionary is empty :(</div>
      )}
    </div>
  );
}

export default DictionaryPage;
