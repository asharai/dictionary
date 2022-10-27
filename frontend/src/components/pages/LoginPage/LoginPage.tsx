import { useState } from 'react';
import { Button } from '../../atoms';
import { Input } from '../../molecules';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [user, setUser] = useState({ email: '', password: '', name: '' });
  const [mode, setMode] = useState<'login' | 'register'>('login');
  // Нужно объединить блок с тексто вместе с формой, в таком случае мы сможем наложить общую анимацию
  return (
    <div className={styles.page}>
      <aside
        className={`${styles.signInDescription} ${
          mode === 'register' && styles.registerBlock
        } ${mode === 'login' && styles.loginBlock}`}
      ></aside>
      <div
        className={`${styles.block} ${mode === 'register' && styles.loginText}`}
      >
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
        <div className={styles.textContent}>
          <h2>Hello Friend!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Button onClick={() => setMode('register')}>Sign In</Button>
        </div>
      </div>
      <div
        className={`${styles.blockRegister} ${
          mode === 'login' && styles.registerText
        }`}
      >
        <div className={styles.textContent}>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Button onClick={() => setMode('login')}>Sign Up</Button>
        </div>
        <div className={styles.signIn}>
          <h1>Create Account</h1>
          <div className={styles.input}>
            <Input
              placeholder="Name"
              onChange={v => setUser({ ...user, name: v })}
              value={user.name}
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
          <Button onClick={() => console.log(user)}>Sign In</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
