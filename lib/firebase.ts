import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyApHc_ZmI9sH-t4krnTDAiHCkl-k8rhcrk",
    authDomain: "mc-scrapper-pro.firebaseapp.com",
    projectId: "mc-scrapper-pro",
    storageBucket: "mc-scrapper-pro.firebasestorage.app",
    messagingSenderId: "712388498701",
    appId: "1:712388498701:web:ab493eae564637fab44c44"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export { auth, googleProvider };
