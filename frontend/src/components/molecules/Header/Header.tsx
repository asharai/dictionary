import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link to={'/'} className={styles.link}>
        Super App
      </Link>
      <ul className={styles.navigation}>
        <Link to={'/dictionary'} className={styles.link}>
          Dictionary
        </Link>
        <li>Cards</li>
      </ul>
    </div>
  );
}
