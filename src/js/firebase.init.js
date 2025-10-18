// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACPUcxIXKle2dsntzIo-1cnuvXNDM2zxg",
  authDomain: "clean-jobs-production.firebaseapp.com",
  projectId: "clean-jobs-production",
  storageBucket: "clean-jobs-production.appspot.com",
  messagingSenderId: "42988735499",
  appId: "1:42988735499:web:660ea72b34dbd6004fcb0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };