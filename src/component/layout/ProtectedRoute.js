import { useLocation,Navigate,Outlet } from 'react-router-dom'
import{ auth } from '../../firebase'

const ProtectedRoute= ({children})=>{
    const location = useLocation()
    return(
        auth.currentUser!==null ?
            children? children:<Outlet/>
            :
            <Navigate to={'/'} replaced state={{from:location}}/> 
    )
}

export default ProtectedRoute