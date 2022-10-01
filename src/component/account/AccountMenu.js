import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import classes from './AccountMenu.module.css'
import UploadImage from './UploadImage'

const AccountMenu = ()=>{
    const {currentUser}=useUserAuth()
    const toggleContainer=useRef(null)
    const {displayName,metadata} = currentUser
    const [day,setDay]= useState('')
    const [editPicture,setEditPicture] = useState(false)
    const [uploadPicture,setUploadPicture] = useState(false)
    const [uploaded,setUploaded] = useState(true)

    useEffect(() => {
        const accountDate=()=>{
            const date = new Date(parseInt(metadata.createdAt))
            setDay(date.toLocaleString().split(',')[0])
        }
        accountDate()
    }, [metadata])

    useEffect(() => {
      const onClickOutsideHandler = (event)=>{
        if (editPicture && !toggleContainer.current.contains(event.target)) {
            setEditPicture( false );
          }
      }
      window.addEventListener('click', onClickOutsideHandler)
      return () => {
        window.removeEventListener('click', onClickOutsideHandler)
      }
    }, [editPicture])
    

    const handleEdit=()=>{
        setEditPicture(true)
    }
    const handleUpload =()=>{
        setUploadPicture(true)
        setEditPicture(false)
    }
    
    return(
        <div className={classes.menu} >
            <div className={classes.imageBox}>
                <img className={classes.image} src={process.env.PUBLIC_URL+'/images/blank-profile-picture.png'} alt='user' ></img>
                <div className={classes.editButtons} ref={toggleContainer}>
                    <div className={classes.edit} onClick={handleEdit} >Edit</div>
                    {editPicture && (
                    <div className={classes.editChoice}>
                        <div className={classes.upload} onClick={handleUpload} >Upload a picture</div>
                        {uploaded && <div className={classes.remove}>Remove picture</div>}
                    </div>)}
                </div>
            </div>
            <h2>Hello, {displayName}</h2>
            <div className={classes.joined}>Account since {day}</div>
            <div className={classes.links}>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/home'>Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/profile'>Profile</NavLink>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/addresses'>Address</NavLink>
                <NavLink className={({ isActive }) => isActive ? classes.isActive : classes.link} to='/account/favorites'>Favorites</NavLink>
                {/* <NavLink to='/account/ordered'>Purchase History</NavLink>    */}
            </div>

            {uploadPicture&& <UploadImage {...{setUploadPicture}} />}
        </div>
    )
}
export default AccountMenu