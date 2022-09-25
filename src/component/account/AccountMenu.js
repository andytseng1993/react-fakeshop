import { Link } from 'react-router-dom'
import classes from './AccountMenu.module.css'


const AccountMenu = ()=>{

    return(
        <div className={classes.menu}>
            <div className={classes.imageBox}>
                <img className={classes.image} src={process.env.PUBLIC_URL+'/images/blank-profile-picture.png'} alt='user' ></img>
                <button className={classes.edit}>Edit</button>
            </div>
            <h2>Hello, name</h2>
            <h4>Account since 09/09/2022 </h4>
            <div className={classes.links}>
                <Link to='/account/profile'>Profile</Link>
                <Link to='/account/addresses'>Address</Link>
                <Link to='/account/favorites'>Favorites</Link>
                <Link to='/account/ordered'>Purchase History</Link>   
            </div>
        </div>
    )
}
export default AccountMenu