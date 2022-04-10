import { useLocation,Navigate,Outlet } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'


const ProtectedRoute= ({children})=>{
    const {currentUser} = useUserAuth()
    const location = useLocation()
    return(
        currentUser ?
            children? children:<Outlet/>
            :
            <Navigate to={'/'} replaced state={{from:location}}/> 
    )
}

export default ProtectedRoute