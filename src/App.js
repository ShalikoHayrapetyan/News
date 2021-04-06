
import './App.css';
import firebase from 'firebase';
import AdminPage from './adminka/AdminPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './components/HomePage';
import CreateUserForm from './adminka/CreateUserForm';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const db = firebase.firestore();
export const storage = firebase.storage()

function App() {
  return (
    <Router>
      <Switch>
        <Route  path="/:category?">
          <HomePage />
        </Route>
        <Route exact path="/admin">
          <AdminPage />
        </Route>
        <Route exact path="/user">
          <CreateUserForm />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
