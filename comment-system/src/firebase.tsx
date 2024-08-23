import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC0-YDPDErkAEpXZaZPGV4ixcSYwm9QN5Q",
    authDomain: "alteroffice-f6cbf.firebaseapp.com",
    projectId: "alteroffice-f6cbf",
    storageBucket: "alteroffice-f6cbf.appspot.com",
    messagingSenderId: "82697002639",
    appId: "1:82697002639:web:558309b84917f51e59dafa",

  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
