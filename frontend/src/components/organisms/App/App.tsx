import axios from '../../../axios';
import { useCallback, useState } from 'react';
import { Button } from '../../atoms';

import { Input, Header } from '../../molecules/';
import './App.css';
import { ITranslatedWord, WordCard } from '../WordCard';

function App() {
  const [inputValue, setInputValue] = useState('');

  const [translatedWord, setTranslatedWord] = useState<ITranslatedWord>();

  const handleTranslate = useCallback(async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/word',
        data: {
          word: inputValue,
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
  }, [inputValue]);

  return (
    <div className="App">
      <Header />
      <div
        style={{
          display: 'flex',
          width: '100%',
          padding: '40px 180px',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Введите текст"
        />
        <Button onClick={handleTranslate}>search</Button>
      </div>
      {translatedWord && (
        <div
          style={{
            display: 'flex',
            width: '100%',

            gap: '24px',
            alignItems: 'center',
          }}
        >
          <WordCard
            meanings={translatedWord.meanings}
            phonetic={translatedWord.phonetic}
            word={translatedWord.word}
            phoneticLink={translatedWord.phoneticLink}
          />
        </div>
      )}
    </div>
  );
}

export default App;
