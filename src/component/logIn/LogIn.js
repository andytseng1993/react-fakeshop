import classes from './LogIn.module.css'
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye} from "@fortawesome/free-solid-svg-icons";

const LogIn=(props)=>{
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [hide,setHide] = useState(true)
    
    const submitHandler=(event)=>{
        event.preventDefault()
        console.log(emailRef.current.value,passwordRef.current.value);
    }
    const hideHandler=()=>{
        setHide(!hide)
    }
    return(
        <section className={classes.login}>
            <div className={classes.content}>
                <div className={classes.title}>Welcome Back!</div>
                <div className={classes.closeBtn}>X</div>
                <form onSubmit={submitHandler}>
                    <input type='email' required id='email' ref={emailRef} placeholder='Email Adress'></input>
                    <div className={classes.password}>
                        <input type={hide?'password':'text'} required id='password' ref={passwordRef} placeholder='Password'></input>
                        <div className={classes.hide} onClick={hideHandler}>
                            {
                                hide?<FontAwesomeIcon icon={faEye}/>: <FontAwesomeIcon icon={faEyeSlash} /> 
                            }
                        </div>
                    </div>

                    <button className={classes.submit}>Log In</button>
                </form>
            </div>
        </section>
    )
}

export default LogIn