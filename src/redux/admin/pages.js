const initialState = {
    addNews: false,
    newsList: false,
    category: false,
}


const pages = (state = initialState, action) => {
    switch (action.type) {
        case "addNews":
            return {
                newsList: false,
                category: false,
                addNews: action.payload.page
            };
        case "newsList":
            return {
                addNews: false,
                category: false,
                newsList: action.payload.page
            };
        case "category":
            return {
                addNews: false,
                newsList: false,
                category: action.payload.page
            };
        default:
            return state

    }
}
export default pages;