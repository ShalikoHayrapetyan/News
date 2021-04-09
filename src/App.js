
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
import { useEffect } from 'react';
import LinearIndeterminate from './adminka/Loading';
import AllNewsInCategory from './components/AllNewsInCategory';
import NewsPage from './components/NewsPage';

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

  function getAllNewsData() {
    db.collection("news")
      .orderBy("timestamp")
      .get()
      .then((querySnapshot) => {
        const all = []
        querySnapshot.forEach((doc) => {
          all.push(doc.data())
        });
        dispatch({
          type: 'getNewsData',
          payload: {
            data: all.reverse()
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
  }
  function getAllCategoryData() {
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        const all = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          all.push(doc.data())
        });
        dispatch({
          type: 'setCatgeoryData',
          payload: {
            data: all
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
  }



  let categoryPath = []
  if (categoriesData) categoryPath = categoriesData.map(category => "/" + category.title)

  useEffect(() => {
    getAllNewsData()
    getAllCategoryData()
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'isAuthenticating',
          payload: true
        });
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
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/user">
              <CreateUserForm />
            </Route>
            <Route path="/News">
              <AllNewsInCategory />
            </Route>
            <Route path={categoryPath}>
              <AllNewsInCategory />
            </Route>
            <Route path="/test">
              <NewsPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      ) : <LinearIndeterminate />}
    </>


  );
}

export default App;
