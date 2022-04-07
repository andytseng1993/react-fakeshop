import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox, setRegisterBox } from "../../redux/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye,faXmark} from "@fortawesome/free-solid-svg-icons";
import classes from './Register.module.css'

const Register=()=>{
    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [hide,setHide] = useState(true)
    const dispatch = useDispatch()
    const register = useSelector((state)=> state.openLogInbox.register)
    console.log(register);
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
    }
    const logIn=()=>{
        dispatch(setLogInBox(true))
        dispatch(setRegisterBox(false))
    }
    
    if(!register) return(<></>)
    return(
        <section className={classes.login}>
            <div className={classes.content}>
                <div className={classes.title}>Join FakeStore</div>
                <div className={classes.detail}>Get free shipping on every order.</div>
                <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                <form onSubmit={submitHandler}>
                    <div className={classes.emailArea}>
                            <div className={classes.email}>First Name</div>
                            <input type='text' required id='first' ref={firstNameRef} placeholder='First Name'></input>
                        </div>
                    <div className={classes.emailArea}>
                        <div className={classes.email}>Last Name</div>
                        <input type='text' required id='last' ref={lastNameRef} placeholder='Last Name'></input>
                    </div>
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
                    <button className={classes.submit}>Join</button>
                </form>
                
                <div className={classes.account}>
                    Already have an account?
                    <button onClick={logIn}>Log in</button>
                </div>                    
            </div>
        </section>
    )
}

export default Register