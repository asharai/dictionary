import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <div>Super App</div>
      <ul className={styles.navigation}>
        <li>Dictionary</li>
        <li>Cards</li>
      </ul>
    </div>
  );
}
