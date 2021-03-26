const initialState = {
    isAdmin: false,
    admin:
    {
        email: "admin",
        password: "admin"
    },

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "signIn/signout":
            return {
                ...state,
                isAdmin: action.payload.isAdmin
            };
        default:
            return state

    }
}
export default authReducer