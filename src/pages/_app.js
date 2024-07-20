// pages/_app.js
import NavBar from '../components/NavBar';
import '../styles/globals.css';  // Adjust the path to your global styles
import { useState, useEffect} from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import firebaseApp from '../firebase';

export default function App({Component, pageProps}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    
    return onAuthStateChanged(getAuth(firebaseApp), (user) => {
      setUser(user);
    });
  }, [])

  return (
    <div>
      <NavBar user={user} />
      <Component user={user} {...pageProps} />
    </div>
  )
}