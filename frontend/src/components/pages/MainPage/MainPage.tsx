import axios from '../../../axios';
import { useCallback, useState } from 'react';
import { Button } from '../../atoms';
import { Input } from '../../molecules/';
import { ITranslatedWord, WordCard } from '../../organisms/WordCard';
import styles from './MainPage.module.css';

function MainPage() {
  const [inputValue, setInputValue] = useState('');

  const [translatedWord, setTranslatedWord] = useState<ITranslatedWord>();

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
    <div>
      <div className={styles.searchContainer}>
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Type a word..."
        />
        <Button onClick={() => handleTranslate(inputValue)}>search</Button>
      </div>
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
