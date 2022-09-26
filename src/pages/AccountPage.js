import { Outlet } from "react-router-dom"
import AccountMenu from "../component/account/AccountMenu"

const AccountPage = ()=>{
    return(
        <div style={{margin:'80px auto 0px auto',display:'flex', maxWidth: 1200,height: 'auto', justifyContent:'center'}}>
            <AccountMenu/>
            <Outlet/>
        </div>
    )
}

export default AccountPage