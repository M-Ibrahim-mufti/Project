import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router/index'
import { getFirestore } from "firebase/firestore"
/// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFD4DPqbxG6hdkdDYutTeeOiRYyh7AeVg",
  authDomain: "memn-3dbd8.firebaseapp.com",
  projectId: "memn-3dbd8",
  storageBucket: "memn-3dbd8.appspot.com",
  messagingSenderId: "1053570715006",
  appId: "1:1053570715006:web:122c0691eaf0bc3c17b72f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// Initialize Firebase
initializeApp(firebaseConfig);
createApp(App)
    .use(router)
    .mount('#app')

export {db}