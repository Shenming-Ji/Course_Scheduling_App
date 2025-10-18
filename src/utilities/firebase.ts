import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type NextOrObserver, type User} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOPpVQr0xX6YAKYVnG9H2dvk_cMGiOWpY",
  authDomain: "coursesscheduler.firebaseapp.com",
  databaseURL: "https://coursesscheduler-default-rtdb.firebaseio.com",
  projectId: "coursesscheduler",
  storageBucket: "coursesscheduler.firebasestorage.app",
  messagingSenderId: "781262097057",
  appId: "1:781262097057:web:e89c44fc8a6d6a355ffee0"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(auth);

export { firebaseSignOut as signOut };

export interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  isInitialLoading: boolean
}

export const addAuthStateListener = (fn: NextOrObserver<User | null>) => (
  onAuthStateChanged(auth, fn)
);

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const isAuthenticated = !!user;

  useEffect(() => addAuthStateListener((user: User | null) => {
      flushSync(() => {
        setUser(user);
        setIsInitialLoading(false);
      })
    }), [])

  return {user, isAuthenticated, isInitialLoading };
};