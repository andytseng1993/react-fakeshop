
import { useRef } from "react";


const LogIn=(props)=>{
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const submitHandler=(event)=>{
        event.preventDefault()
        console.log(emailRef.current.value,passwordRef.current.value);
    }
    return(
        <section>
            <div>
                <div></div>
                <form onSubmit={submitHandler}>
                    <label htmlFor="email">Email :</label>
                    <input type='text' required id='email' ref={emailRef}></input>
                    <label htmlFor="password">Password :</label>
                    <input type='password' required id='password' ref={passwordRef}></input>
                    <button>Log In</button>
                </form>
            </div>
        </section>
    )
}

export default LogIn