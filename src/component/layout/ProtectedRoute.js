import { useEffect, useState } from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'


const ProtectedRoute= ({children})=>{
    const [login,setLogin] = useState(null)
    const {currentUser} = useUserAuth()
    const location = useLocation()
    useEffect(() => {
        if(currentUser==='') return
        if(currentUser===null) return setLogin(false)
        setLogin(true)
    }, [currentUser])
    if(login===true) return (children? children:<Outlet/>)
    if(login===false) return (<Navigate to={'/'} replaced state={{from:location}}/>)
}

export default ProtectedRoute