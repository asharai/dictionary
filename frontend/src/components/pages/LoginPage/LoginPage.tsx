import { useCallback, useState } from 'react';

import axios from '../../../axios';
import styles from './LoginPage.module.css';
import { IRegisterUser, LoginContent, RegisterContent } from './components';

function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleRegister = useCallback(async (user: IRegisterUser) => {
    try {
      const res = await axios({
        method: 'post',
        url: '/auth/register',
        data: user,
      });

      if (res !== undefined) {
        window.location.pathname = '/';
      }
    } catch {
      console.log('doesnt work');
    }
  }, []);

  const handleLogin = useCallback(
    async (user: Omit<IRegisterUser, 'fullName'>) => {
      try {
        const res = await axios({
          method: 'post',
          url: '/auth/login',
          data: user,
        });

        if (res !== undefined) {
          window.location.pathname = '/';
        }
      } catch {
        console.log('doesnt work');
      }
    },
    [],
  );

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.signInDescription} ${
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
