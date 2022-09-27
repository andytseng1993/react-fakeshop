import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUserAuth } from '../../context/UserAuthContext'
import { setUserName } from '../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelopeCircleCheck} from "@fortawesome/free-solid-svg-icons";
import classes from './Profile.module.css'
import PasswordInput from '../logIn/PasswordInput'
import { NavLink } from 'react-router-dom'


const Profile=()=>{
    const [profileDisabledBtn,setProfileDisabledBtn] = useState(true)
    const [passwordDisabledBtn,setPasswordDisabledBtn] = useState(true)
    const NameRef = useRef('')
    const [password,setPassword] = useState({
        oldPassword:'',
        passwordInput:'',
        confirmPasswordInput:''
    })
    const [error,setError] = useState('')
    const [verification,setVerification] = useState('')
    const [verificationError,setVerificationError]= useState('')
    const [success,setSuccess] = useState('')
    const [userUpdateSuccess,setUserUpdateSuccess] = useState('')
    const dispatch=useDispatch()
    const {currentUser,updatfile,updateNewPassword,sendVerificationEmail}=useUserAuth()
    const {emailVerified,displayName,email,metadata} = currentUser
    
    useEffect(()=>{
        NameRef.current.value = displayName
    },[displayName])
    useEffect(()=>{
        if(password.passwordInput.length>0 && password.confirmPasswordInput.length>0){
            return setPasswordDisabledBtn(false)
        }
        setPasswordDisabledBtn(true) 
    },[password])

    const nameInput=(event)=>{
        event.target.value.length>0?
        setProfileDisabledBtn(false):setProfileDisabledBtn(true)
    }

    const handlePasswordInput = (data)=>{
        setPassword(prevPassword=> {return {...prevPassword,...data}})
    }
    
    const nameSubmitHandler= async (event)=>{
        event.preventDefault()
        await updatfile({displayName: NameRef.current.value.trim()}).then(()=>{
            dispatch(setUserName( NameRef.current.value.trim()))
        })
        setProfileDisabledBtn(true)
        setUserUpdateSuccess('Success to update User Name')
        setTimeout(()=>{
            setUserUpdateSuccess('')
        },3000)
    }
    const newPasswordSubmitHandler= async (event)=>{
        event.preventDefault()
        const {oldPassword,passwordInput,confirmPasswordInput} = password
        if(passwordInput!==confirmPasswordInput){
            setError('New Password do not match.')
            return setTimeout(()=>{
                setError('')
            },3000)
        }
        
        await updateNewPassword(email,oldPassword,passwordInput)
        .then(()=>{
            setPasswordDisabledBtn(true)
            setPassword({oldPassword: '', passwordInput:'', confirmPasswordInput:''})
            setSuccess('Success to update password')
            return setTimeout(()=>{
                setSuccess('')
            },3000)
        }) 
        .catch ((error)=>{
            setError(error.message)
            return setTimeout(()=>{
                setError('')
            },3000)
        })   
    }
    const sendVerification = (event)=>{
        event.preventDefault()
        sendVerificationEmail().then(()=>{
            setVerification('Email verification sent! Please check your Email inbox!')
            setTimeout(()=>{
                setVerification('')
            },3000)
        }).catch((err)=>{
            setVerificationError(err.message)
            setTimeout(()=>{
                setVerificationError('')
            },3000)
        })
    }
    return (
        <section className={classes.profile}>
            <div className={classes.routes}>
                <NavLink to='/account'>Account </NavLink>/<span style={{fontWeight:700}}> Profile</span>
            </div>
            <div className={classes.profileArea}> 
                <span>Profile</span>
                <form onSubmit={nameSubmitHandler}>
                    <div className={classes.name}>
                       <label>Nickname : </label>
                        <input  type='text' ref={NameRef} 
                                onChange={nameInput}
                                placeholder={displayName}
                        ></input> 
                    </div>
                    <div className={classes.email}>
                        <label>E-mail : </label>
                        <div style={{display:'flex',width:'100%'}}>
                            <input defaultValue={email} disabled></input>
                            {emailVerified?
                                <FontAwesomeIcon className={classes.verified} icon={faEnvelopeCircleCheck} />:
                                <button className={classes.verifiedBtn} onClick={sendVerification}>Verify Email</button>
                            }
                        </div>
                    </div>
                    <button disabled={profileDisabledBtn} >Update User Name</button>
                </form>
                <div>{userUpdateSuccess && <div className={classes.success}>{userUpdateSuccess}</div>}</div>
                <div>{verification && <div className={classes.success}>{verification}</div>}</div>
                <div>{verificationError && <div className={classes.error}>{verificationError}</div>}</div>
            </div>
            <div className={classes.passwordArea}>
                <span>Reset Password</span> 
                <form onSubmit={newPasswordSubmitHandler}>
                    <label className={classes.password}>Old Password* </label>
                        <PasswordInput password={password.oldPassword} handleChange={handlePasswordInput} keyName={'oldPassword'} />
                    <label className={classes.password}>New Password* </label>
                        <PasswordInput password={password.passwordInput} handleChange={handlePasswordInput} keyName={'passwordInput'} />
                    <label className={classes.password}>Confirm New Password* </label>
                        <PasswordInput password={password.confirmPasswordInput} handleChange={handlePasswordInput} keyName={'confirmPasswordInput'} />
                    <div className={classes.passwordAlert}>Password must have at least 6 characters. </div>
                    <button disabled={passwordDisabledBtn}>Update Password</button>
                </form>
                {success && <div className={classes.success}>{success}</div>}
                {error && <div className={classes.error}>{error}</div>}
            </div>
        </section>
    )
}
export default Profile