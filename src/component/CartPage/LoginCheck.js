import classes from './LoginCheck.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setLogInBox } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const LoginCheck = ({setLoginCheck})=>{
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const closeHandler =()=>{
        setLoginCheck(false)
    }
    const handleLogin = ()=>{
        dispatch(setLogInBox(true))
        setLoginCheck(false)
    }
    const handleCheckout = ()=>{
        navigation('/checkout')
    }
    return (
        <div className={classes.checkBox}>
            <div className={classes.content}>
                <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                <div className={classes.guest}>
                    <h2>GUEST CUSTOMERS</h2>
                    <h3>Check out without a account </h3>
                    <button onClick={handleCheckout}>CHECKOUT AS GUEST</button>
                </div>
                <div className={classes.break}>
                    <hr></hr>
                    <span className={classes.or}>or</span>
                    <hr></hr>
                </div>
                <div className={classes.login}>
                    <h2>Log in for faster checkout</h2>
                    <button onClick={handleLogin}>LOG IN</button>
                </div>
                    
            </div>
        </div>
    )
}

export default LoginCheck