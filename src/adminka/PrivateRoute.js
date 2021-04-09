
////Not Used
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"

export default function PrvateRoute ({children, ...rest}){
    const role = useSelector(state => state.authReducer.role)
    console.log(children)

    if(role==="admin"){
        return(
        <Route { ...rest} >
        {children}
       </Route>)
       }else return <Redirect to="/somewhere/else" />
     
}