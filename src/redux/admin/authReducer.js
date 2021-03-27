const initialState = {
    
        adminEmail: null,
 

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "signIn":
            return {
                adminEmail:action.payload.adminEmail
            };
            case "signOut":
                return {
                    adminEmail:null
                };
        default:
            return state

    }
}
export default authReducer