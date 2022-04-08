import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { setLogInBox } from "../../redux/actions"
import classes from './Navigation.module.css'

function Navigation(props){
    const openLogIn = useSelector((state)=> state.openLogInbox.logIn)
    const dispatch=useDispatch()
    const {logout,currentUser,User} = useUserAuth()
    const lockScroll = useCallback(
        () => {
          const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollBarCompensation}px`;
        }, [])
    const openLogInHandler=()=>{
        dispatch(setLogInBox(!openLogIn))
        lockScroll()  
    }
    const logOutHandler= async ()=>{
        try {
            await logout()
        } catch (error) {
            console.log(error);
        }
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
                <div>
                    {User && `Hello, ${User}`} 
                </div>
                
                { currentUser===null?
                    <button onClick={openLogInHandler}>
                    Log In
                    </button> 
                    :
                    <button onClick={logOutHandler}>
                        Log Out
                    </button>
                }
            
            </nav>
        </header>
    )
}

export default Navigation