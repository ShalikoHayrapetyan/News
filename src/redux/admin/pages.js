const initialState = {

    categoryState: false,
    editNewsId: null
}


const pages = (state = initialState, action) => {
    switch (action.type) {

        case "addNewCategory":
            return {
                ...state,
                         categoryState: action.payload.page
            };
        case "editingNews":
            return {
                ...state,
                            editNewsId: action.payload.id
            };
        default:
            return state

    }
}
export default pages;