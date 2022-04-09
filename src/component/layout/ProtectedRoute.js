import { useLocation,Navigate,Outlet } from 'react-router-dom'
import{ auth } from '../../firebase'

const ProtectedRoute= ({children})=>{
    const location = useLocation()
    console.log(auth);
    return(
        auth?.currentUser?
            children? children:<Outlet/>
            :
            <Navigate to={'/'} replaced state={{from:location}}/> 
    )
}

export default ProtectedRoute