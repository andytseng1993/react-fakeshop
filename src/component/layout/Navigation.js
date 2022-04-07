import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { setLogInBox } from "../../redux/actions"
import classes from './Navigation.module.css'

function Navigation(props){
    const openLogIn = useSelector((state)=> state.openLogInbox)
    const dispatch=useDispatch()
    const openLogInHandler=()=>{
        dispatch(setLogInBox(!openLogIn))  
    }
    return(
        <header className={classes.header}>
            <div className={classes.logo}>
                <NavLink to='/'>
                    FakeStore
                </NavLink>
            </div>
            <nav>
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink to='shop'>
                    Shop
                </NavLink>
                <button onClick={openLogInHandler}>
                    Log In
                </button>
            </nav>
        </header>
    )
}

export default Navigation