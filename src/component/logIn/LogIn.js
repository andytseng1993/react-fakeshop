import classes from './LogIn.module.css'
import { useRef } from "react";


const LogIn=(props)=>{
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const submitHandler=(event)=>{
        event.preventDefault()
        console.log(emailRef.current.value,passwordRef.current.value);
    }
    return(
        <section className={classes.login}>
            <div className={classes.content}>
                <div className={classes.title}>Welcome Back!</div>
                <div className={classes.closeBtn}>X</div>
                <form onSubmit={submitHandler}>
                    <input type='email' required id='email' ref={emailRef} placeholder='Email Adress'></input>
                    <input type='password' required id='password' ref={passwordRef} placeholder='Password'></input>
                    <button className={classes.submit}>Log In</button>
                </form>
            </div>
        </section>
    )
}

export default LogIn