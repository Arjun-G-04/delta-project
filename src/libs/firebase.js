import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "delta-project-arjun.firebaseapp.com",
    projectId: "delta-project-arjun",
    storageBucket: "delta-project-arjun.appspot.com",
    messagingSenderId: "297330444781",
    appId: "1:297330444781:web:a56c8a8966da56a8397fe4",
    measurementId: "G-V9YCW0N09N"
};

const app = initializeApp(firebaseConfig);

export default app