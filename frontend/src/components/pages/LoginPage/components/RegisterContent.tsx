import { FC, useState } from 'react';
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
  onLogin: (user: typeof initialUserState) => void;
  onChangeMode: (mode: 'register' | 'login') => void;
}

export const RegisterContent: FC<IRegisterContentProps> = ({
  onLogin,
  onChangeMode,
}) => {
  const [user, setUser] = useState(initialUserState);

  const handleChangeMode = () => {
    setUser(initialUserState);
    onChangeMode('login');
  };

  const handleRegister = () => {
    onLogin(user);
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
        <Button onClick={handleRegister}>Sign Up</Button>
      </div>
    </>
  );
};
