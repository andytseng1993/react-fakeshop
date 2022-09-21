import { Link } from 'react-router-dom'
import classes from './AccountMenu.module.css'


const AccountMenu = ()=>{

    return(
        <div className={classes.menu}>
            <img className={classes.image} src={process.env.PUBLIC_URL+'/images/blank-profile-picture.png'} alt='user' ></img>
            <h2>Hello, name</h2>
            <h4>Account since 09/09/2022 </h4>
            <Link to='/account/profile'>Profile</Link>
            <Link to='/account/address'>Address</Link>
            Favorites
            Purchase History
        </div>
    )
}
export default AccountMenu