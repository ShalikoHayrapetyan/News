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