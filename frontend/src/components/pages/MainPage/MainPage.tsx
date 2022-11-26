import axios from '../../../axios';
import { useCallback, useState } from 'react';
import { ITranslatedWord, WordCard, WordSearch } from '../../organisms/';

import styles from './MainPage.module.css';

function MainPage() {
  const [translatedWord, setTranslatedWord] = useState<ITranslatedWord>();
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleTranslate = useCallback(async (word: string) => {
    setError(false);
    setLoading(true);
    setTranslatedWord(undefined);
    try {
      const res = await axios({
        method: 'post',
        url: '/word',
        data: {
          word: word,
        },
      });

      const phonetics = res.data[0].phonetics.filter((item: any) => item.audio);

      setTranslatedWord({
        ...res.data[0],
        phoneticLink: phonetics?.length > 0 ? phonetics[0].audio : undefined,
      });
    } catch {
      setError(true);
      setTranslatedWord(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.page}>
      <WordSearch onTranslate={handleTranslate} />
      {isLoading && (
        <div className={styles.contentContainer}>
          <h3>Searching...</h3>
        </div>
      )}
      {translatedWord && (
        <div className={styles.contentContainer}>
          <WordCard
            meanings={translatedWord.meanings}
            phonetic={translatedWord.phonetic}
            word={translatedWord.word}
            phoneticLink={translatedWord.phoneticLink}
            handleFindWord={handleTranslate}
          />
        </div>
      )}
      {hasError && (
        <div className={styles.contentContainer}>
          <h3>We didn't find such word</h3>
        </div>
      )}
    </div>
  );
}

export default MainPage;
