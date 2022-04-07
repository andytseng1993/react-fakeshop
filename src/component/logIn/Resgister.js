import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox } from "../../redux/actions"
import classes from './Register.module.css'

const Register=()=>{
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [hide,setHide] = useState(true)
    const dispatch = useDispatch()
    const openLogIn = useSelector((state)=> state.openLogInbox)
    
    const submitHandler=(event)=>{
        event.preventDefault()
        console.log(emailRef.current.value,passwordRef.current.value);
    }
    const hideHandler=()=>{
        setHide(!hide)
    }
    const closeHandler=()=>{
        dispatch(setLogInBox(!openLogIn))
    }
    console.log(openLogIn);
    if(!openLogIn) return(<></>)
    return(
        <section className={classes.login}>
            <div className={classes.content}>
                <div className={classes.title}>Welcome Back!</div>
                <div className={classes.detail}>Log in for faster checkout.</div>
                <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                <form onSubmit={submitHandler}>
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
                    <button>Create one</button>
                </div>                    
            </div>
        </section>
    )
}

export default Register