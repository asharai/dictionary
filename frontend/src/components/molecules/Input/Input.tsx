import { ChangeEvent, useCallback, FC } from 'react';
import styles from './Input.module.css';

interface IInputProps {
  onChange: (v: string) => void;
  value?: string;
  placeholder?: string;
  type?: 'password' | 'text';
}

export const Input: FC<IInputProps> = ({
  value = '',
  onChange,
  placeholder,
  type = 'text',
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      type={type}
      className={styles.input}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
