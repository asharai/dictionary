import { FC, ReactNode } from 'react';
import styles from './Button.module.css';
interface IButtonProps {
  children: ReactNode;
  onClick: () => void | Promise<void>;
}
const Button: FC<IButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
