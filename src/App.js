import { useEffect, useState } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "./admin/AdminPage";
import LinearIndeterminate from "./admin/Loading";
import Main from "./components/Main";
import { fetchAllCategory, fetchAllNews } from "./redux/asyncNewsActions";
import "./App.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

function App() {
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(
    (state) => state.authReducer.isAuthenticating
  );
  const categoriesData = useSelector(
    (state) => state.fireBaseData.categoryData
  );
  const allNewsData = useSelector((state) => state.fireBaseData.allNewsData);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => () => setIsUnmounted(true), []);

  useEffect(() => {
    dispatch(fetchAllNews());
    dispatch(fetchAllCategory());

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "isAuthenticating",
          payload: true,
        });
        db.collection("users")
          .where("userEmail", "==", user.email)
          .get()
          .then((querySnapshot) => {
            if (isUnmounted) return;
            querySnapshot.forEach((doc) => {
              dispatch({
                type: "signIn",
                payload: {
                  adminEmail: user.email,
                  adminName: doc.data().userName,
                  role: doc.data().role,
                },
              });
            });
          })
          .finally(() => {
            dispatch({
              type: "isAuthenticating",
              payload: false,
            });
          });
      }
    });
    return () => unsubscribe();
  }, [isUnmounted, dispatch]);

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
      ) : (
        <LinearIndeterminate />
      )}
    </>
  );
}

export default App;
