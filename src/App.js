
import './App.css';
import firebase from 'firebase';
import AdminPage from './adminka/AdminPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomePage from './components/HomePage';
import CreateUserForm from './adminka/forms/CreateUserForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import LinearIndeterminate from './adminka/Loading';
import AllNewsInCategory from './components/AllNewsInCategory';
import NewsPage from './components/NewsPage';
import { getAllNewsData, getAllCategoryData } from './getFunctions';
import Header from './components/Header';
import Main from './components/Main';

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
  const isAuthenticating = useSelector(state => state.authReducer.isAuthenticating)
  const categoriesData = useSelector(state => state.fireBaseData.categoryData);
  const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
  const [isUnmounted, setIsUnmounted] = useState(false);




  let categoryPath = []
  if (categoriesData) categoryPath = categoriesData.map(category => "/" + category.title)
  useEffect(() => () => setIsUnmounted(true), [])

  useEffect(() => {
    getAllNewsData(dispatch)
    getAllCategoryData(dispatch)
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'isAuthenticating',
          payload: true
        });
        db.collection("users").where("userEmail", "==", user.email)
          .get()
          .then((querySnapshot) => {
            if (isUnmounted) return;
            querySnapshot.forEach((doc) => {
              dispatch({
                type: 'signIn',
                payload: {
                  adminEmail: user.email,
                  adminName: doc.data().userName,
                  role: doc.data().role
                }
              });

            })
          }).finally(() => {
            dispatch({
              type: 'isAuthenticating',
              payload: false
            });


          })
      }
    });
  }, []);

  return (
    <>
      {isAuthenticating ? (
        <LinearIndeterminate />
      ) : categoriesData && allNewsData ? (
        <Router>
          <Switch>
          <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      ) : <LinearIndeterminate />}
    </>


  );
}

export default App;
