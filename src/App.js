
import './App.css';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDvmPrdgCaZQ1BqFiUpfaerO0JKeb7lQgk",
  authDomain: "news-aca.firebaseapp.com",
  projectId: "news-aca",
  storageBucket: "news-aca.appspot.com",
  messagingSenderId: "559724492296",
  appId: "1:559724492296:web:1007aa320247ef66db83bd"
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div >
      <h1>My Empty Project</h1>
    </div>
  );
}

export default App;
