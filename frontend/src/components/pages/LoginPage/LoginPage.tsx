import { useState } from 'react';
import { Button } from '../../atoms';
import { Input } from '../../molecules';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [mode, setMode] = useState<'login' | 'register'>('login');
  return (
    <div className={styles.page}>
      <aside
        className={`${styles.signInDescription} ${
          mode === 'register' && styles.registerBlock
        }`}
      >
        {mode === 'login' && (
          <div className={styles.textContent}>
            <h2>Welcome Back!</h2>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <Button onClick={() => setMode('register')}>Sign Up</Button>
          </div>
        )}
        {mode === 'register' && (
          <div className={styles.textContent}>
            <h2>Hello Friend!</h2>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <Button onClick={() => setMode('login')}>Sign In</Button>
          </div>
        )}
      </aside>
      <div className={styles.signIn}>
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
        <Button onClick={() => console.log(user)}>Sign In</Button>
      </div>
    </div>
  );
}

export default LoginPage;
