import { initializeApp } from "firebase/app";

/* Google Auth */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/* thay config thành config của bạn */
const firebaseConfig = {
  apiKey: "AIzaSyBEcqwE_QFyB0OAOuwyvmmTZiIQGM8tMQQ",
  authDomain: "freshmart2-ee5be.firebaseapp.com",
  projectId: "freshmart2-ee5be",
  storageBucket: "freshmart2-ee5be.appspot.com",
  messagingSenderId: "756014547713",
  appId: "1:756014547713:web:de4587d3d0d9532360d100",
  measurementId: "G-KRKB6WXFXM"
};
const app = initializeApp(firebaseConfig);

/* Google Auth Import */
const googleProvider = new GoogleAuthProvider();
export async function googleLogin() {
    let auth = getAuth(app);
    return await signInWithPopup(auth, googleProvider)
}