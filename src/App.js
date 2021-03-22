import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
