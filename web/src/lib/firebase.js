import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAroBTexiXeaJGYqMiIIM5POdN2JUuigvo",
  authDomain: "hexagesgames-f8fe2.firebaseapp.com",
  projectId: "hexagesgames-f8fe2",
  storageBucket: "hexagesgames-f8fe2.firebasestorage.app",
  messagingSenderId: "469976981538",
  appId: "1:469976981538:web:c5b49c15b0206c7fb76a7b",
  measurementId: "G-6E33GJ0ZB0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export let analytics = null;

if (typeof window !== 'undefined') {
  try { analytics = getAnalytics(app); } catch (e) {}
}

export default app;