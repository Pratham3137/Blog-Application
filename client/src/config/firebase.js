import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBm4uNowyitDCcH4Pocs67ksyQHPo8GcuY",
  authDomain: "blog-image-32c6e.firebaseapp.com",
  projectId: "blog-image-32c6e",
  storageBucket: "blog-image-32c6e.appspot.com",
  messagingSenderId: "927886815617",
  appId: "1:927886815617:web:8e22ebbb976035e51eb880",
  measurementId: "G-CQGJ5WDTJL",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);