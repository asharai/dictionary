import { FC, useState } from 'react';
import { Button } from '../../../atoms';
import { Input } from '../../../molecules';
import styles from './ContentStyles.module.css';

const initialUserState = { email: '', password: '' };

interface ILoginContentProps {
  onLogin: (user: typeof initialUserState) => void;
  onChangeMode: (mode: 'register' | 'login') => void;
}

export const LoginContent: FC<ILoginContentProps> = ({
  onLogin,
  onChangeMode,
}) => {
  const [user, setUser] = useState(initialUserState);

  const handleChangeMode = () => {
    setUser(initialUserState);
    onChangeMode('register');
  };

  const handleLogin = () => {
    onLogin(user);
  };

  return (
    <>
      <div className={styles.form}>
        <h1>Sign in to Dictionary</h1>
        <div className={styles.input}>
          <Input
            placeholder="Email"
            onChange={v => setUser({ ...user, email: v })}
            value={user.email}
          />
        </div>
        <div className={styles.input}>
          <Input
            placeholder="Password"
            onChange={v => setUser({ ...user, password: v })}
            type="password"
            value={user.password}
          />
        </div>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
      <div className={styles.textContent}>
        <h2 className={styles.title}>Hello Friend!</h2>
        <p className={styles.description}>
          Enter your details and and start journey with us
        </p>

        <button
          onClick={handleChangeMode}
          className={`${styles.btn} ${styles.description}`}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};
