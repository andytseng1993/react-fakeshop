import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUserAuth } from '../../context/UserAuthContext'
import { setUserName } from '../../redux/actions'
import classes from './Profile.module.css'


const Profile=()=>{
    const [profileBtn,setProfileBtn] = useState(true)
    const [passwordBtn,setPasswordBtn] = useState(true)
    const dispatch=useDispatch()
    const [Name,setName] = useState('')
    const {currentUser,updatfile}=useUserAuth()
    const {displayName,email} = currentUser
    
    console.log(currentUser);
    useEffect(()=>{
        setName(displayName)
    },[])
    const nameHandler=(event)=>{
        setName(event.target.value)
        setProfileBtn(false)
    }
    const profileBtnHandler=(event)=>{
        event.preventDefault()
        updatfile({displayName:Name})
        dispatch(setUserName(Name))
    }
    return (
        <section className={classes.profile}>
            <div className={classes.profileArea}> Profile
                <form>
                    <label>Name : </label>
                    <input  type='text' value={Name} 
                            onChange={nameHandler}
                            placeholder={displayName}
                    ></input>
                    <label>E-mail Address : </label>
                    <input defaultValue={email} readOnly></input>
                    <button disabled={profileBtn} onClick={profileBtnHandler}>Update Profile</button>
                </form>
                <div>Joined</div>
            </div>
            <div className={classes.passwordArea}> Password
                <form>
                    <label>New Password : </label>
                    <input></input>
                    <label>Confirm Password : </label>
                    <input></input>
                    <button disabled={passwordBtn}>Update Password</button>
                </form>
            </div>
        </section>
    )
}
export default Profile