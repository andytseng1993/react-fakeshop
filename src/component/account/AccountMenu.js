import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import { useUserData } from '../../context/UserDataContext'
import classes from './AccountMenu.module.css'
import UploadImage from './UploadImage'
import { deleteObject, getDownloadURL, getStorage, ref } from "firebase/storage"

const AccountMenu = ()=>{
    const {currentUser}=useUserAuth()
    const toggleContainer=useRef(null)
    const {displayName,metadata,uid} = currentUser
    const [day,setDay]= useState('')
    const [editPicture,setEditPicture] = useState(false)
    const [uploadPicture,setUploadPicture] = useState(false)
    const [uploaded,setUploaded] = useState(false)
    const { readUserData, writeUserData} = useUserData()
    const [profilePic,setProfilePic] = useState(process.env.PUBLIC_URL+'/images/blank-profile-picture.png')
    const [pictureName,setPictureName] = useState({name:'',extension:''})
    const [freshPage,setFreshPage] = useState(false)

    useEffect(() => {
        let isCancel = false
        const readProfilePictureDate = async()=>{
            await readUserData('users/'+uid+'/profileImage/')
            .then(res=>{
                if(!isCancel && res.val()){
                    res.forEach(element => {
                        const storage = getStorage();
                        const pathReference = ref(storage, '/users/'+uid+'/images/'+element.key+'.'+element.val());
                        getDownloadURL(pathReference).then((url)=>{
                            setProfilePic(url);
                            setPictureName({name: element.key,extension: element.val()})
                            setUploaded(true)
                        })
                    });
                }
            })  
        }
        const accountDate=()=>{
            const date = new Date(parseInt(metadata.createdAt))
            setDay(date.toLocaleString().split(',')[0])
        }
        accountDate()
        readProfilePictureDate()
        return () => {
            isCancel = true 
        }
    }, [freshPage,metadata])

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
    const handleRemove = ()=>{
        const storage = getStorage();
        const desertRef = ref(storage, '/users/'+uid+'/images/'+pictureName.name+'.'+pictureName.extension);
            deleteObject(desertRef).then(() => {
                writeUserData('users/'+uid+'/profileImage/'+pictureName.name,{})
                setFreshPage(!freshPage)
                setProfilePic(process.env.PUBLIC_URL+'/images/blank-profile-picture.png')
                setEditPicture(false)
                setPictureName({name:'',extension:''})
            }).catch((error) => {
                console.log(error);
            });
    }
    return(
        <div className={classes.menu} >
            <div className={classes.imageBox}>
                <img className={classes.image} src={profilePic} alt='user' ></img>
                <div className={classes.editButtons} ref={toggleContainer}>
                    <div className={classes.edit} onClick={handleEdit} >Edit</div>
                    {editPicture && (
                    <div className={classes.editChoice}>
                        <div className={classes.upload} onClick={handleUpload} >Upload a picture</div>
                        {uploaded && <div className={classes.remove} onClick={handleRemove}>Remove picture</div>}
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

            {uploadPicture&& <UploadImage {...{setUploadPicture,pictureName,freshPage,setFreshPage}} />}
        </div>
    )
}
export default AccountMenu