const initialState = {
    allNewsData: null,
    categoryData:null
}

const fireBaseData = (state = initialState, action) => {
    switch (action.type) {

        case "getNewsData":
            return {
                ...state,
                allNewsData: action.payload.data
                            
            };
            case "setCatgeoryData":
                return {
                    ...state,
                    categoryData: action.payload.data
                                
                };
        default:
            return state

    }
}
export default fireBaseData;