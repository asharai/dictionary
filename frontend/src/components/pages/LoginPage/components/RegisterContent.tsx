import axios from '../../../../axios';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, useAuthStore } from '../../../../core/store/auth-store';
import { Button } from '../../../atoms';
import { Input } from '../../../molecules';
import styles from './ContentStyles.module.css';

export interface IRegisterUser {
  email: string;
  password: string;
  fullName: string;
}

const initialUserState: IRegisterUser = {
  email: '',
  password: '',
  fullName: '',
};

interface IRegisterContentProps {
  onChangeMode: (mode: 'register' | 'login') => void;
}

export const RegisterContent: FC<IRegisterContentProps> = ({
  onChangeMode,
}) => {
  const [user, setUser] = useState(initialUserState);

  const { logIn } = useAuthStore();

  const [hasError, setError] = useState(false);
  const navigate = useNavigate();

  const handleChangeMode = () => {
    setUser(initialUserState);
    onChangeMode('login');
  };
  const handleRegister = async () => {
    try {
      const res: IUser = await axios({
        method: 'post',
        url: '/auth/register',
        data: user,
      });

      if (res !== undefined) {
        logIn();
        window.localStorage.setItem('token', res.token);
        navigate('/');
      }
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <div className={styles.textContent}>
        <h2 className={styles.title}>Welcome Back!</h2>
        <p className={styles.description}>
          To keep connected with us please login with your personal info
        </p>

        <button
          onClick={handleChangeMode}
          className={`${styles.btn} ${styles.description}`}
        >
          Sign In
        </button>
      </div>
      <div className={styles.form}>
        <h1>Create Account</h1>
        <div className={styles.input}>
          <Input
            placeholder="Name"
            onChange={v => setUser({ ...user, fullName: v })}
            value={user.fullName}
          />
        </div>
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
        {hasError && <div>Validation Error</div>}
        <Button onClick={handleRegister}>Sign Up</Button>
      </div>
    </>
  );
};
