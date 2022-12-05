import { useEffect, useState } from 'react';

import styles from './LoginPage.module.css';
import { LoginContent, RegisterContent } from './components';
import { useAuthStore } from '../../../core/store/auth-store';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { isAuthorized } = useAuthStore();
  const [isLoaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 800);
  }, []);

  return (
    <div className={styles.page}>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: '#333',
          zIndex: isLoaded ? 1 : 999,
          opacity: isLoaded ? 0 : 1,
          transition: '1s',
        }}
      ></div>
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
        <LoginContent onChangeMode={setMode} />
      </div>

      <div
        className={`${styles.block} ${styles.blockRegister} ${
          mode === 'login' ? styles.registerText : styles.activeBlock
        }`}
      >
        <RegisterContent onChangeMode={setMode} />
      </div>
    </div>
  );
}

export default LoginPage;
