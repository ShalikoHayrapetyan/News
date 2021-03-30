const initialState = {

    CategoryState:false,
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
                CategoryState:false,
                addNews: action.payload.page
            };
        case "newsList":
            return {
                addNews: false,
                category: false, 
                editNewsId:null,
                CategoryState:false,
                newsList: action.payload.page
            };
        case "category":
            return {
                addNews: false,
                newsList: false,
                editNewsId:null ,
                CategoryState:false,
                category: action.payload.page
            };
            case "editingNews":
                return {
                    addNews: false,
                    newsList: false,
                    category:false,
                    CategoryState:false,
                    editNewsId: action.payload.id
                };
                case "addNewCategory":
                    return {
                        addNews: false,
                        newsList: false,
                        category:true,
                         editNewsId: null,
                         CategoryState:action.payload.page
                       
                    };
        default:
            return state

    }
}
export default pages;