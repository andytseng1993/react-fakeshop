import { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox, setRegisterBox, setUserName } from "../../redux/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye,faXmark} from "@fortawesome/free-solid-svg-icons";
import classes from './Register.module.css'
import {useUserAuth} from '../../context/UserAuthContext'


const Register=()=>{
    const NameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const passwordConfirmRef = useRef('')
    const [hide,setHide] = useState(true)
    const [confirmHide,setConfirmHide] = useState(true)
    const [error,setError] = useState('')
    const {signup ,updatfile} = useUserAuth()
    const [loading,setLoading] =useState(false)
    const registerActive = useSelector((state)=> state.openLogInbox.register)
    const dispatch = useDispatch()
    
    
    const unlockScroll = useCallback(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''
      }, [])
    const submitHandler= async (event)=>{
        event.preventDefault()
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            setError('Password do not match.')
            return setTimeout(()=>{
                setError('')
            },3000)
        } 
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            await updatfile({displayName:NameRef.current.value.trim()})
            .then(()=>{
                unlockScroll()
                dispatch(setRegisterBox(false))
                dispatch(setUserName(NameRef.current.value.trim()))
            })
        } catch (error) {
            setError(error.message)
            setTimeout(()=>{
                setError('')
            },3000)
        }
        setLoading(false)
    }
    const hideHandler=()=>{
        setHide(!hide)
    }
    const confirmHideHandler=()=>{
        setConfirmHide(!confirmHide)
    }
    const closeHandler=()=>{
        dispatch(setLogInBox(false))
        dispatch(setRegisterBox(false))
        unlockScroll()
    }
    const logIn=()=>{
        dispatch(setLogInBox(true))
        dispatch(setRegisterBox(false))
    }
    
    if(!registerActive) return(<></>)
    return(
        <section className={classes.login}>
            <div className={classes.content}>
                <div className={classes.title}>Join FakeStore</div>
                <div className={classes.detail}>Get free shipping on every order.</div>
                {error && <div className={classes.error}>{error}</div>}
                <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                <form className={classes.form}  onSubmit={submitHandler}>
                    <div className={classes.inputArea}>
                        <div className={classes.email}>Name</div>
                        <input type='text' required id='name' ref={NameRef} placeholder='Name'></input>
                    </div>
                    <div className={classes.inputArea}>
                        <div className={classes.email}>Email</div>
                        <input type='text' required id='email' ref={emailRef} placeholder='Email Adress'></input>
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
                    <div className={classes.passwordArea}>
                        <div className={classes.password}>Password Confirmation</div>
                        <input type={confirmHide?'password':'text'} required id='passwordconfirm' ref={passwordConfirmRef} placeholder='Password Confirmation'></input>
                        <div className={classes.hide} onClick={confirmHideHandler}>
                            {
                                confirmHide? <FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                            }
                        </div>
                    </div>
                    <button className={classes.submit}>Join</button>
                </form>
                
                <div className={classes.account}>
                    Already have an account?
                    <button disabled={loading} onClick={logIn}>Log in</button>
                </div>                    
            </div>
        </section>
    )
}

export default Register