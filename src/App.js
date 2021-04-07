
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
import NewsPage from './components/NewsPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LocalDining } from '@material-ui/icons';
import LinearIndeterminate from './adminka/Loading';

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
  const dispatch = useDispatch();
  const isAuthenticating =useSelector(state => state.authReducer.isAuthenticating)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection("users").where("userName", "==", user.email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        dispatch({
                            type: 'signIn',
                            payload: {

                                adminEmail: user.email,
                                role: doc.data().role
                            }
                        });

                    })
                })
            }
    });
}, []);

  return (
    <>
    {/* {isAuthenticating ? (
      <LinearIndeterminate />
    ) : ( */}
      <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/user">
          <CreateUserForm />
        </Route>
        <Route path="/news">
          <NewsPage />
        </Route>
      </Switch>
    </Router>
    )}
    </>
  

  );
}

export default App;
