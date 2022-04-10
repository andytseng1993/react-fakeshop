import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUserAuth } from '../../context/UserAuthContext'
import { setUserName } from '../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye} from "@fortawesome/free-solid-svg-icons";
import classes from './Profile.module.css'


const Profile=()=>{
    const [profileDisabledBtn,setProfileDisabledBtn] = useState(true)
    const [passwordDisabledBtn,setPasswordDisabledBtn] = useState(true)
    const NameRef = useRef('')
    const [hide,setHide] = useState(true)
    const [confirmHide,setConfirmHide] = useState(true)
    const [newPassword,setNewPassword] = useState('')
    const [newConfirmPassword,setNewConfirmPassword] = useState('')
    const [error,setError] = useState('')
    const dispatch=useDispatch()
    const {currentUser,updatfile,updateNewPassword}=useUserAuth()
    const {displayName,email,metadata} = currentUser
    
    
    useEffect(()=>{
        NameRef.current.value=displayName
    },[])

    const nameInput=(event)=>{
        event.target.value.length>0?
        setProfileDisabledBtn(false):setProfileDisabledBtn(true)

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
        await updatfile({displayName: NameRef.current.value}).then(()=>{
            dispatch(setUserName( NameRef.current.value))
        })
        setProfileDisabledBtn(true)
    }
    const newPasswordSubmitHandler= async (event)=>{
        event.preventDefault()
        if(newPassword!==newConfirmPassword){
            setError('Password do not match.')
            return setTimeout(()=>{
                setError('')
            },3000)
        }
        try {
           await updateNewPassword(newPassword)
        .then(()=>{
            console.log('success');
            setPasswordDisabledBtn(true)
            setNewPassword('')
            setNewConfirmPassword('')
        }) 
        } catch (error) {
            setError(error.message)
            return setTimeout(()=>{
                setError('')
            },3000)
        }  
    }
    return (
        <section className={classes.profile}>
            <div className={classes.profileArea}> Profile
                <form onSubmit={nameSubmitHandler}>
                    <label>Name : </label>
                    <input  type='text' ref={NameRef} 
                            onChange={nameInput}
                            placeholder={displayName}
                    ></input>
                    <label>E-mail Address : </label>
                    <input defaultValue={email} disabled></input>
                    <button disabled={profileDisabledBtn} >Update User Name</button>
                </form>
                <div>Joined : {metadata.creationTime}</div>
                <div>Last SignIn Time : {metadata.lastSignInTime}</div>
            </div>
            <div className={classes.passwordArea}> Password
                <div>{error && <div className={classes.error}>{error}</div>}</div>
                <form onSubmit={newPasswordSubmitHandler}>
                    <label>New Password* </label>
                    <div>
                        <input type={hide?'password':'text'} onChange={passwordInput}></input>
                        <div className={classes.hide} onClick={()=>setHide(!hide)}>
                            {
                                hide? <FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                            }
                        </div>
                    </div>
                    <label>Confirm New Password* </label>
                    <div>
                        <input type={confirmHide?'password':'text'} onChange={confirmpasswordInput}></input>
                        <div className={classes.hide} onClick={()=>setConfirmHide(!confirmHide)}>
                            {
                                confirmHide? <FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                            }
                        </div>    
                    </div>
                    <div>Password must have at least 6 characters. </div>
                    <button disabled={passwordDisabledBtn}>Update Password</button>
                </form>
            </div>
        </section>
    )
}
export default Profile