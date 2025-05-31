import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD11RhySchyLi-4veEQG1aUyn8jb-IJE6k",
  authDomain: "app-2025-aaron.firebaseapp.com",
  projectId: "app-2025-aaron",
  storageBucket: "app-2025-aaron.firebasestorage.app",
  messagingSenderId: "650223840802",
  appId: "1:650223840802:web:727b576e0da0802f73247b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup (auth, new GoogleAuthProvider());
    const user = result.user;

    window.alert(`Signed in with ${user.email}`);
  } catch (e) {
    window.alert(e.message);
  }
};

export const signOutFromGoogle = async () => {
  try {
    await signOut(auth);

    window.alert('Signed out!');
  } catch (e) {
    window.alert(e.message);
  }
};