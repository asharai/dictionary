import { useCallback, useState } from 'react';
import { Button } from '../../atoms';
import { Input } from '../../molecules/';

import styles from './WordSearch.module.css';

const WordSearch = ({
  onTranslate,
}: {
  onTranslate: (word: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleTranslateWord = useCallback(() => {
    onTranslate(inputValue);
  }, [inputValue, onTranslate]);

  return (
    <div className={styles.searchContainer}>
      <Input
        value={inputValue}
        onChange={setInputValue}
        placeholder="Type a word..."
      />
      <Button onClick={handleTranslateWord}>search</Button>
    </div>
  );
};

export default WordSearch;
