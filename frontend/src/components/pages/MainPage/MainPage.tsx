import axios from '../../../axios';
import { useCallback, useEffect, useState } from 'react';

import { ITranslatedWord, WordCard, WordSearch } from '../../organisms/';
import styles from './MainPage.module.css';
import { useUserStore } from '../../../core/store/user-store';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [translatedWord, setTranslatedWord] = useState<ITranslatedWord>();

  const { isAuthorized } = useUserStore();
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized === false) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  const handleTranslate = useCallback(async (word: string) => {
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
      console.log('doesnt work');
    }
  }, []);

  return (
    <div className={styles.page}>
      <WordSearch onTranslate={handleTranslate} />
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
    </div>
  );
}

export default MainPage;
