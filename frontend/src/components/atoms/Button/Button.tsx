import { FC, ReactNode } from 'react';
import styles from './Button.module.css';
interface IButtonProps {
  children: ReactNode;
  onClick: () => void | Promise<void>;
  type?: 'initial' | 'withoutBorder';
}
const Button: FC<IButtonProps> = ({ children, onClick, type = 'initial' }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
