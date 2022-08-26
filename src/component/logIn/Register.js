import { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox, setRegisterBox, setUserName } from "../../redux/actions"
import classes from './Register.module.css'
import {useUserAuth} from '../../context/UserAuthContext'
import LogInBox from "./LogInBox";
import PasswordInput from "./PasswordInput";
import EmailInput from './EmailInput';

const Register=()=>{
    const NameRef = useRef('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState({
        password: '',
        confirmPassword: ''
    })
    const [error,setError] = useState('')
    const {signup ,updatfile} = useUserAuth()
    const [loading,setLoading] =useState(false)
    const registerActive = useSelector((state)=> state.openLogInbox.register)
    const dispatch = useDispatch()
    
    const handleEmailChange =(emailInput)=>{
        setEmail(emailInput)
    }
    const unlockScroll = useCallback(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''
    }, [])

    const validateEmail = (email) => {
        let regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
        return regex.test(String(email).toLowerCase())
    }
    const sendErrorMessage =(message)=>{
        return (
            setError(message),
            setTimeout(()=>{
                setError('')
            },3000)
        )
    }
    const submitHandler= async (event)=>{
        event.preventDefault()
        if(NameRef.current.value===''|| email===''||password.password===''|| password.confirmPassword==='') return
        if(!validateEmail(email)){
            sendErrorMessage('Email is not vaild, please enter again.')
            return
        }
        if(password.password.length<6){
            sendErrorMessage('Password must have at least 6 characters.')
            return
        }
        if(password.password!==password.confirmPassword){
            sendErrorMessage('Password do not match.')
            return
        } 
        try {
            setError('')
            setLoading(true)
            await signup(email,password.password)
            await updatfile({displayName:NameRef.current.value.trim()})
            .then(()=>{
                unlockScroll()
                dispatch(setRegisterBox(false))
                dispatch(setUserName(NameRef.current.value.trim()))
            })
        } catch (error) {
            sendErrorMessage(error.message)
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
                <EmailInput email={email} handleChange={handleEmailChange} />
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