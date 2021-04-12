import { db } from "./App";

export function getAllNewsData(dispatch) {
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

  export function getAllCategoryData(dispatch) {
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
