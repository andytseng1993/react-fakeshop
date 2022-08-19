import { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox, setRegisterBox, setUserName } from "../../redux/actions"
import classes from './Register.module.css'
import {useUserAuth} from '../../context/UserAuthContext'
import LogInBox from "./LogInBox";
import PasswordInput from "./PasswordInput";


const Register=()=>{
    const NameRef = useRef('')
    const emailRef = useRef('')
    const [password,setPassword] = useState({
        password: '',
        confirmPassword: ''
    })
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
        if(password.password.length<6){
            setError('Password must have at least 6 characters.')
            return (
                setTimeout(()=>{
                    setError('')
                },3000)
            )
        }
        if(password.password!==password.confirmPassword){
            setError('Password do not match.')
            return setTimeout(()=>{
                setError('')
            },3000)
        } 
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,password.password)
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
    const handleChange=(data)=>{
        setPassword(prevState => {return{...prevState,...data}})
    }
    const logIn=()=>{
        dispatch(setLogInBox(true))
        dispatch(setRegisterBox(false))
    }
    
    if(!registerActive) return(<></>)
    return(
        <LogInBox>
            <div className={classes.title}>Join FakeStore</div>
            <div className={classes.detail}>Get free shipping on every order.</div>
            {error && <div className={classes.error}>{error}</div>}
            <form className={classes.form}  onSubmit={submitHandler}>
                <div className={classes.inputArea}>
                    <div className={classes.email}>Name</div>
                    <input type='text' required id='name' ref={NameRef} placeholder='Name'></input>
                </div>
                <div className={classes.inputArea}>
                    <div className={classes.email}>Email</div>
                    <input type='text' required id='email' ref={emailRef} placeholder='Email Adress'></input>
                </div>
                <PasswordInput name={'Password'} password={password.password} handleChange={handleChange} keyName={'password'} />
                <PasswordInput name={'Password Confirmation'} password={password.confirmPassword} handleChange={handleChange} keyName={'confirmPassword'} />
                <button className={classes.submit}>Join</button>
            </form>
            
            <div className={classes.account}>
                Already have an account?
                <button disabled={loading} onClick={logIn}>Log in</button>
            </div>                    
        </LogInBox>
    )
}

export default Register