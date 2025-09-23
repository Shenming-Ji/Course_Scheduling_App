import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOPpVQr0xX6YAKYVnG9H2dvk_cMGiOWpY",
  authDomain: "coursesscheduler.firebaseapp.com",
  projectId: "coursesscheduler",
  storageBucket: "coursesscheduler.firebasestorage.app",
  messagingSenderId: "781262097057",
  appId: "1:781262097057:web:e89c44fc8a6d6a355ffee0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}