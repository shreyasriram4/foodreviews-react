import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="/leaderboard" className={styles.link}>Food Leaderboard</Link>
      {user && (
        <>
          <Link href="/new-item" className={styles.link}>New Item</Link>
          <Link href="/logout" className={styles.link}>Sign Out</Link>
        </>
      )}
      {!user && (
        <Link href="/login" className={styles.link}>Admin Login</Link>
      )}
    </nav>
  );
};

export default NavBar;

