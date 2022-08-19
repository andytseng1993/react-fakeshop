import classes from './LogIn.module.css'
import {  useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLogInBox, setRegisterBox, setUserName } from '../../redux/actions';
import { useUserAuth } from '../../context/UserAuthContext';
import LogInBox from './LogInBox';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';


const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login ,currentUser} = useUserAuth()
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const dispatch = useDispatch()

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
    const resetAccount =()=>{
        console.log('111');
    }
    if (!openLogIn) return (<></>)
    return (
        <LogInBox>
            <div className={classes.title}>Welcome Back!</div>
            <div className={classes.detail}>Log in for faster checkout.</div>
            {error && <div className={classes.error}>{error}</div>}
            <form className={classes.form} onSubmit={submitHandler}>
                <EmailInput email={email} handleChange={handleEmailChange} />
                <PasswordInput name={'Password'} password={password} handleChange={handleChange} keyName={'password'} />
                <button className={classes.submit}>Log In</button>
            </form>
            <button className={classes.reset} onClick={resetAccount}>Forgot Password?</button>          
            <div className={classes.account}>No account?
                <button disabled={loading} onClick={createAccount}>Create one</button>
            </div>  
        </LogInBox>
    )
}
export default LogIn