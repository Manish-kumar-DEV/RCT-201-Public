import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../Redux/store"



const RequireAuth = ({children}: {children: JSX.Element}) => {
    const isAuth = useAppSelector(store => store.AuthReducer.isAuth);
    const location = useLocation();

    if(!isAuth){
        return <Navigate to='/login' replace state={{data: location.pathname}}/>
    }
    return children
}

export default RequireAuth