import classes from './LogIn.module.css'
import { useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye,faXmark} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { setLogInBox, setRegisterBox } from '../../redux/actions';

const LogIn=(props)=>{
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [hide,setHide] = useState(true)
    const dispatch = useDispatch()
    const openLogIn = useSelector((state)=> state.openLogInbox.logIn)
    
    const unlockScroll = useCallback(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''
      }, [])
    const submitHandler=(event)=>{
        event.preventDefault()
        console.log(emailRef.current.value,passwordRef.current.value);
    }
    const hideHandler=()=>{
        setHide(!hide)
    }
    const closeHandler=()=>{
        dispatch(setLogInBox(false))
        dispatch(setRegisterBox(false))
        unlockScroll()
    }
    const createAccount=()=>{
        dispatch(setRegisterBox(true))
        dispatch(setLogInBox(false))
    }

    if(!openLogIn) return(<></>)
    return(
        <section className={classes.login}>
            <div className={classes.content}>
                <div className={classes.title}>Welcome Back!</div>
                <div className={classes.detail}>Log in for faster checkout.</div>
                <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.emailArea}>
                        <div className={classes.email}>Email</div>
                        <input type='email' required id='email' ref={emailRef} placeholder='Email Adress'></input>
                    </div>
                    <div className={classes.passwordArea}>
                        <div className={classes.password}>Password</div>
                        <input type={hide?'password':'text'} required id='password' ref={passwordRef} placeholder='Password'></input>
                        <div className={classes.hide} onClick={hideHandler}>
                            {
                                hide? <FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                            }
                        </div>
                    </div>
                    <button className={classes.submit}>Log In</button>
                </form>
                
                <div className={classes.account}>No account?
                    <button onClick={createAccount}>Create one</button>
                </div>                    
            </div>
        </section>
    )
}

export default LogIn