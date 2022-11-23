import { useCallback, useEffect, useState } from 'react';

import axios from '../../../axios';
import styles from './LoginPage.module.css';
import { IRegisterUser, LoginContent, RegisterContent } from './components';
import { IUser, useUserStore } from '../../../core/store/user-store';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { isAuthorized, logIn } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized, navigate]);

  const handleAuthorization = useCallback(
    async (
      user: IRegisterUser | Omit<IRegisterUser, 'fullName'>,
      path: 'register' | 'login',
    ) => {
      try {
        const res: IUser = await axios({
          method: 'post',
          url: `/auth/${path}`,
          data: user,
        });

        if (res !== undefined) {
          logIn(res);
          window.location.pathname = '/';
        }
      } catch {
        console.log('doesnt work');
      }
    },
    [logIn],
  );

  const handleRegister = useCallback(
    (user: IRegisterUser) => handleAuthorization(user, 'register'),
    [handleAuthorization],
  );

  const handleLogin = useCallback(
    (user: Omit<IRegisterUser, 'fullName'>) =>
      handleAuthorization(user, 'login'),
    [handleAuthorization],
  );

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.descriptionBlock} ${
          mode === 'register' ? styles.registerBlock : styles.loginBlock
        }`}
      >
        <div className={styles.btnBorder}></div>
      </aside>
      <div
        className={`${styles.block} ${
          mode === 'register' ? styles.loginText : styles.activeRegisterBlock
        } `}
      >
        <LoginContent onChangeMode={setMode} onLogin={handleLogin} />
      </div>

      <div
        className={`${styles.block} ${styles.blockRegister} ${
          mode === 'login' ? styles.registerText : styles.activeBlock
        }`}
      >
        <RegisterContent onChangeMode={setMode} onLogin={handleRegister} />
      </div>
    </div>
  );
}

export default LoginPage;
