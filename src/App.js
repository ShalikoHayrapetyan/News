
import './App.css';
import firebase from 'firebase';
import AdminPage from './adminka/AdminPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './HomePage';

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
    <Router>
      <Switch>
        <Route exact path="/">
         <HomePage />
        </Route>
        <Route path="/admin">
          <AdminPage/>
        </Route>
      
      </Switch>
    </Router>

  );
}

export default App;
