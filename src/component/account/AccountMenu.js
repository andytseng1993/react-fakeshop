import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import classes from './AccountMenu.module.css'


const AccountMenu = ()=>{
    const {currentUser}=useUserAuth()
    const {displayName,metadata} = currentUser
    const [day,setDay]= useState('')
    useEffect(() => {
        const accountDate=()=>{
            const date = new Date(parseInt(metadata.createdAt))
            setDay(date.toLocaleString().split(',')[0])
        }
        accountDate()
    }, [metadata])
    
    return(
        <div className={classes.menu}>
            <div className={classes.imageBox}>
                <img className={classes.image} src={process.env.PUBLIC_URL+'/images/blank-profile-picture.png'} alt='user' ></img>
                <button className={classes.edit}>Edit</button>
            </div>
            <h2>Hello, {displayName}</h2>
            <div className={classes.joined}>Account since {day}</div>
            <div className={classes.links}>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/home'>Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/profile'>Profile</NavLink>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/addresses'>Address</NavLink>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/favorites'>Favorites</NavLink>
                {/* <NavLink to='/account/ordered'>Purchase History</NavLink>    */}
            </div>
        </div>
    )
}
export default AccountMenu