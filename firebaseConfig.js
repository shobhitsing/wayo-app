import firebase from 'firebase';
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBdk-V3YO_8Cx-op4ZC8pjwQ6QJxbdxFr8",
  authDomain: "demofire-cdc7d.firebaseapp.com",
  projectId: "demofire-cdc7d",
  storageBucket: "demofire-cdc7d.appspot.com",
  messagingSenderId: "755210503869",
  appId: "1:755210503869:web:f282766a797e24c9a899d4",
  measurementId: "G-Q8EDX5W2J5"
  };
  


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore()






