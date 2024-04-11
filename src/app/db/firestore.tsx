import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKrPdfrTof7MER0lqdrDtA07M_E_gIeqw",
  authDomain: "salawaty-f8465.firebaseapp.com",
  projectId: "salawaty-f8465",
  storageBucket: "salawaty-f8465.appspot.com",
  messagingSenderId: "329429310126",
  appId: "1:329429310126:web:76d9868dea929206c86b3f"
};

initializeApp(firebaseConfig);

const db = getFirestore()

export default db;
