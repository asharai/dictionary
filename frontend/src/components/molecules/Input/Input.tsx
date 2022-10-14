import { ChangeEvent, useCallback, FC } from 'react';
import styles from './Input.module.css';

interface IInputProps {
  onChange: (v: string) => void;
  value?: string;
  placeholder?: string;
}

export const Input: FC<IInputProps> = ({
  value = '',
  onChange,
  placeholder,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
