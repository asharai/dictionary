import axios from '../../../../axios';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, useUserStore } from '../../../../core/store/user-store';
import { Button } from '../../../atoms';
import { Input } from '../../../molecules';
import styles from './ContentStyles.module.css';

const initialUserState = { email: '', password: '' };

interface ILoginContentProps {
  onChangeMode: (mode: 'register' | 'login') => void;
}

export const LoginContent: FC<ILoginContentProps> = ({ onChangeMode }) => {
  const { logIn } = useUserStore();
  const [user, setUser] = useState(initialUserState);
  const [hasError, setError] = useState(false);
  const navigate = useNavigate();

  const handleChangeMode = () => {
    setUser(initialUserState);
    onChangeMode('register');
    setError(false);
  };

  const handleChangeUser = (newUser: typeof initialUserState) => {
    setUser(newUser);
    setError(false);
  };

  const handleLogin = async () => {
    try {
      const res: IUser = await axios({
        method: 'post',
        url: '/auth/login',
        data: user,
      });

      if (res !== undefined) {
        logIn(res);
        navigate('/');
      }
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <h1>Sign in to Dictionary</h1>
        <div className={styles.input}>
          <Input
            placeholder="Email"
            onChange={v => handleChangeUser({ ...user, email: v })}
            value={user.email}
          />
        </div>
        <div className={styles.input}>
          <Input
            placeholder="Password"
            onChange={v => handleChangeUser({ ...user, password: v })}
            type="password"
            value={user.password}
          />
        </div>
        {hasError && <div>Wrong Email or Password</div>}
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
