import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUserAuth } from '../../context/UserAuthContext'
import { setUserName } from '../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye,faEnvelopeCircleCheck} from "@fortawesome/free-solid-svg-icons";
import classes from './Profile.module.css'


const Profile=()=>{
    const [profileDisabledBtn,setProfileDisabledBtn] = useState(true)
    const [passwordDisabledBtn,setPasswordDisabledBtn] = useState(true)
    const NameRef = useRef('')
    const [oldPasswordHide,setOldPasswordHide] = useState(true)
    const [hide,setHide] = useState(true)
    const [confirmHide,setConfirmHide] = useState(true)
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [newConfirmPassword,setNewConfirmPassword] = useState('')
    const [error,setError] = useState('')
    const [verification,setVerification] = useState('')
    const [verificationError,setVerificationError]= useState('')
    const [success,setSuccess] = useState('')
    const [userUpdateSuccess,setUserUpdateSuccess] = useState('')
    const dispatch=useDispatch()
    const {currentUser,updatfile,updateNewPassword,sendVerificationEmail}=useUserAuth()
    const {emailVerified,displayName,email,metadata} = currentUser
    console.log(currentUser.getIdToken());
    
    useEffect(()=>{
        NameRef.current.value=displayName
    },[])

    const nameInput=(event)=>{
        event.target.value.length>0?
        setProfileDisabledBtn(false):setProfileDisabledBtn(true)

    }
    const oldPasswordInput = (event)=>{
        setOldPassword(event.target.value)
    }
    const passwordInput = (event)=>{
        setNewPassword(event.target.value)
        event.target.value.length>0 && newConfirmPassword.length>0?
        setPasswordDisabledBtn(false) 
        :
        setPasswordDisabledBtn(true) 
    }
    const confirmpasswordInput = (event)=>{
        setNewConfirmPassword(event.target.value)
        event.target.value.length>0 && newPassword.length>0?
        setPasswordDisabledBtn(false) 
        :
        setPasswordDisabledBtn(true) 
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
        if(newPassword!==newConfirmPassword){
            setError('Password do not match.')
            return setTimeout(()=>{
                setError('')
            },3000)
        }
        
        await updateNewPassword(email,oldPassword,newPassword)
        .then(()=>{
            setPasswordDisabledBtn(true)
            setNewPassword('')
            setNewConfirmPassword('')
            setOldPassword('')
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
            <div className={classes.profileArea}> 
            <span>Profile</span>
                <form onSubmit={nameSubmitHandler}>
                    <div className={classes.name}>
                       <label>Name : </label>
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
                    <div className={classes.joined}>Joined : {metadata.creationTime}</div>
                    <div className={classes.joined}>Last SignIn Time : {metadata.lastSignInTime}</div>
                    <button disabled={profileDisabledBtn} >Update User Name</button>
                </form>
                <div>{userUpdateSuccess && <div className={classes.success}>{userUpdateSuccess}</div>}</div>
                <div>{verification && <div className={classes.success}>{verification}</div>}</div>
                <div>{verificationError && <div className={classes.error}>{verificationError}</div>}</div>
            </div>
            <div className={classes.passwordArea}>
                <span>Password</span> 
                <form onSubmit={newPasswordSubmitHandler}>
                    <label>Old Password* </label>
                    <div className={classes.password}>
                        <input type={oldPasswordHide?'password':'text'} value={oldPassword} onChange={oldPasswordInput}></input>
                        <div className={classes.hide} onClick={()=>setOldPasswordHide(!oldPasswordHide)}>
                            {
                                oldPasswordHide? <FontAwesomeIcon className={classes.hide} icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                            }
                        </div>
                    </div>
                    <label>New Password* </label>
                    <div className={classes.password}>
                        <input type={hide?'password':'text'} value={newPassword} onChange={passwordInput}></input>
                        <div className={classes.hide} onClick={()=>setHide(!hide)}>
                            {
                                hide? <FontAwesomeIcon className={classes.hide} icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                            }
                        </div>
                    </div>
                    <label>Confirm New Password* </label>
                    <div className={classes.password}>
                        <input type={confirmHide?'password':'text'} value={newConfirmPassword} onChange={confirmpasswordInput}></input>
                        <div className={classes.hide} onClick={()=>setConfirmHide(!confirmHide)}>
                            {
                                confirmHide? <FontAwesomeIcon className={classes.hide} icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                            }
                        </div>    
                    </div>
                    <div className={classes.passwordAlert}>Password must have at least 6 characters. </div>
                    <button disabled={passwordDisabledBtn}>Update Password</button>
                </form>
                <div>{success && <div className={classes.success}>{success}</div>}</div>
                <div>{error && <div className={classes.error}>{error}</div>}</div>
                
            </div>
        </section>
    )
}
export default Profile