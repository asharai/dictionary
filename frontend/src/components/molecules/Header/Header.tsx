import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../core/store/auth-store';
import styles from './Header.module.css';

export default function Header() {
  const { isAuthorized, logOut } = useAuthStore();

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        Super App
      </Link>
      <ul className={styles.navigation}>
        <Link to="/dictionary" className={styles.link}>
          Dictionary
        </Link>
        <li>
          {isAuthorized ? (
            <button className={`${styles.link} ${styles.btn}`} onClick={logOut}>
              Logout
            </button>
          ) : (
            <Link className={styles.link} to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
