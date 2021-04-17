import newsSvc from "../../services/newsSvc"

export const fetchAllNews = () => dispatch => {
    newsSvc.getAllNewsData().then((querySnapshot) => {
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
}

export const fetchAllCategory = () => dispatch => {
    newsSvc.getAllCategoryData().then((querySnapshot) => {
        const all = []
        querySnapshot.forEach((doc) => {
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