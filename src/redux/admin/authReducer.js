const initialState = {

        adminEmail: null,
        adminName: null,
        role:null,
        isAuthenticating: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "signIn":
            return {
                adminEmail:action.payload.adminEmail,
                adminName:action.payload.adminName,
                role:action.payload.role,

            };
            case "signOut":
                return {
                    adminEmail:null,
                    role:null,
                    
                };
                case "isAuthenticating":
                    return {
                       ...state,
                       isAuthenticating:action.payload
                    };
        default:
            return state

    }
}
export default authReducer