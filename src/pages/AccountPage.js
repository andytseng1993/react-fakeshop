import { Outlet } from "react-router-dom"
import Profile from "../component/account/Profile"

const AccountPage = ()=>{
    return(
        <>
            <h1 style={{marginTop: 100}}>Account</h1>
            <Outlet/>
        </>
    )
}

export default AccountPage