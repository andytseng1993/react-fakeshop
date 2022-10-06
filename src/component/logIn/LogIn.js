import classes from './LogIn.module.css'
import {  useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLogInBox, setRegisterBox, setUserName } from '../../redux/actions';
import { useUserAuth } from '../../context/UserAuthContext';
import LogInBox from './LogInBox';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success,setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login ,currentUser,sendResetEmail} = useUserAuth()
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const dispatch = useDispatch()
    const [resetPasswordBox, setResetPasswordBox] = useState(false)
    const [resetPasswordEmail, setResetPasswordEmail] = useState('')
    const [resetPasswordBoxError,setResetPasswordBoxError]= useState('')

    const unlockScroll = () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(email, password)
                .then(() => { 
                    setEmail('')
                    setPassword('')
                    unlockScroll()
                    dispatch(setLogInBox(false))
                    dispatch(setUserName(currentUser.displayName))
                })
        } catch (error) {
            setError('Failed to log in.')
            setTimeout(() => {
                setError('')
            }, 3000)
        }
        setLoading(false)
    }
    const handleEmailChange =(emailInput)=>{
        setEmail(emailInput)
    }
    const handleChange = ({password}) => {
        setPassword(password)
    }
    const createAccount = () => {
        dispatch(setRegisterBox(true))
        dispatch(setLogInBox(false))
    }
    const handleResetEmailChange = (email)=>{
        setResetPasswordEmail(email)
    }
    const validateEmail = (email) => {
        let regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
        return regex.test(String(email).toLowerCase())
    }
    
    const handleResetPassword= async(event)=>{
        event.preventDefault()
        if(!validateEmail(resetPasswordEmail)){
            setResetPasswordBoxError('Email is not vaild, please enter again.')
            return (
                setTimeout(() => {
                    setResetPasswordBoxError('')
                }, 3000)
            ) 
        }
        try{
            await sendResetEmail(resetPasswordEmail).then(()=>{
                setSuccess('Password reset email sent!')
                setTimeout(() => {
                    setSuccess('')
                    setResetPasswordBox(false)
                }, 3000)
            })
        } catch (error) {
            setResetPasswordBoxError(error.message)
            setTimeout(() => {
                setResetPasswordBoxError('')
            }, 3000)
        }
        
    }
    
    const loginPage = (
        <>
            <div className={classes.title}>Welcome Back!</div>
            <div className={classes.detail}>Log in for faster checkout.</div>
            {error && <div className={classes.error}>{error}</div>}
            <form className={classes.form} onSubmit={submitHandler}>
                <EmailInput email={email} handleChange={handleEmailChange} />
                <PasswordInput name={'Password'} password={password} handleChange={handleChange} keyName={'password'} />
                <button className={classes.submit}>Log In</button>
            </form>
            <button className={classes.reset} onClick={()=>setResetPasswordBox(true)}>Forgot Password?</button>          
            <div className={classes.account}>No account?
                <button disabled={loading} onClick={createAccount}>Create one</button>
            </div>
        </>
    )
    const frogotPasswordPage =(
        <div className={classes.resetBox}>
            <div className={classes.back} onClick={()=>setResetPasswordBox(false)}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div className={classes.resetTitle}>Password Reset</div>
            <div className={classes.resetDetail}>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</div>
            {resetPasswordBoxError && <div className={classes.error}>{resetPasswordBoxError}</div>}
            <form className={classes.resetForm} onSubmit={handleResetPassword}>
                <EmailInput email={resetPasswordEmail} handleChange={handleResetEmailChange} />
                <button className={classes.submit}>Reset My Password</button>
            </form>
            {success && <div className={classes.success}>{success}</div>}
        </div>
    )

    if (!openLogIn) return (<></>)
    return (
        <LogInBox>
            {resetPasswordBox?frogotPasswordPage:loginPage}
        </LogInBox>
    )
}
export default LogIn