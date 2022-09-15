import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink,useNavigate } from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { setLogInBox, setUserName } from "../../redux/actions"
import classes from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Navigation(props) {
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const userName = useSelector((state)=> state.setUserName) 
    const cartCount = useSelector((state)=> state.setCartList).length
    const { logout,currentUser } = useUserAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(()=>{
        currentUser?.displayName? 
            dispatch(setUserName(currentUser.displayName.trim()))
            :
            dispatch(setUserName(''))
    },[currentUser?.displayName,dispatch])
    

    const lockScroll = useCallback(
        () => {
            const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarCompensation}px`;
        }, [])
    const openLogInHandler = () => {
        dispatch(setLogInBox(!openLogIn))
        lockScroll()
    }
    const logOutHandler = async () => {
        try {
            await logout()
            .then(()=>{
                dispatch(setUserName(''))
                navigate('/')
            })
        } catch (error) {
            console.log(error);
        }
    }
    const scrollToHome = ()=>{
        window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      })
  }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <NavLink to='/' onClick={()=> scrollToHome()}>
                    FakeStore
                </NavLink>
            </div>
            <nav>
                <NavLink to='/' onClick={()=> scrollToHome()} >
                    Home
                </NavLink>
                <NavLink to='/' onClick={()=> setTimeout(()=>{props.scroll()},750) }>
                    Product
                </NavLink>
                
                {userName?
                    <div className={classes.user}>
                        {`Hello, ${userName}`}
                        <div className={classes.userBox}>
                            <NavLink to='profile' className={classes.signout}>
                                Profile
                            </NavLink>
                            <NavLink to='favorite' className={classes.signout}>
                                Favorite    
                            </NavLink>    
                            <div className={classes.signout} onClick={logOutHandler}>
                                Log Out
                            </div>
                        </div>
                    </div>
                    :
                    <button className={classes.signIn} onClick={openLogInHandler}>
                        Log In
                    </button>
                }
                <NavLink to='cart' className={classes.cart}>
                    <FontAwesomeIcon icon={faCartShopping} style={cartCount>0? {color: 'black'} : {color: '#ccc' }} />
                    {
                        cartCount>0?
                            <div className={classes.cartCount}>{cartCount}</div>
                            :
                            <div></div>
                    }
                </NavLink>
            </nav>
        </header>
    )
}

export default Navigation