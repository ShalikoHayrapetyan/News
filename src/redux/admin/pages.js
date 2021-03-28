const initialState = {
    addNews: false,
    newsList: false,
    category: false,
    editNewsId:null,
}


const pages = (state = initialState, action) => {
    switch (action.type) {
        case "addNews":
            return {
                newsList: false,
                category: false,
                editNewsId:null,
                addNews: action.payload.page
            };
        case "newsList":
            return {
                addNews: false,
                category: false, 
                editNewsId:null,
                newsList: action.payload.page
            };
        case "category":
            return {
                addNews: false,
                newsList: false,
                editNewsId:null ,
                category: action.payload.page
            };
            case "editingNews":
                return {
                    addNews: false,
                    newsList: false,
                    category:false,
                    editNewsId: action.payload.id
                };
        default:
            return state

    }
}
export default pages;