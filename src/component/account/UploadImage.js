import classes from './UploadImage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from 'react';

const UploadImage= ({setUploadPicture})=>{
    const [pictureSrc, setPictureSrc] = useState(null)
    const [isCropping,setIsCropping] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [uploadErr,setUploadErr] = useState('')
    const [position,setPosition] =useState({x: 100, y: 0})
    const hiddenFileInput = useRef(null)

    const closeHandler =()=>{
        setUploadPicture(false)
        setPictureSrc(null)
        setIsCropping(false)
    }
    const handleDrag = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") return setDragActive(true)
        if (e.type === "dragleave") return setDragActive(false)
        if (e.dataTransfer.files[0]) {
            setDragActive(false)
            handleImage(e.dataTransfer.files[0])
        }
    }
    
    const handLeloadImage =(event)=>{
        hiddenFileInput.current.click()
    }
    const handleLoadImageChange =(event)=>{
        handleImage(event.target.files[0])
        
    }
    const handleImage = (file)=>{
        if(file.size > 1024*1024*3) return setUploadErr('Please upload a picture smaller than 3 MB.')
        let img = new Image()
        let objectUrl = URL.createObjectURL(file);
        img.src = objectUrl
        img.onload = function () {
            console.log(img.naturalWidth + " " + img.naturalHeight);
            URL.revokeObjectURL(objectUrl);
        }
        setPictureSrc(objectUrl)
        setIsCropping(true)
    }

    return (
        <div className={classes.uploadArea}>
                <div className={classes.content}>
                    <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                    <h1 style={{marginBottom:30}}>Profile picture</h1>
                    <div className={classes.uploadImageZone}>
                        {!isCropping &&<div className={`${classes.fileDragZone} ${dragActive ? classes.dragActive : "" }`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrag}> </div>}
                        {pictureSrc && <img className={classes.uploadImage} src={pictureSrc} alt='user' ></img> }
                        {isCropping && <div className={classes.uploadImageBackground} >
                            <div className={classes.uploadImageSquare} style={{left:position.x,top:position.y}}>
                            <div className={classes.uploadImageCircle}></div>
                                <div className={classes.NWCircle}></div>
                                <div className={classes.NECircle}></div>
                                <div className={classes.SWCircle}></div>
                                <div className={classes.SECircle}></div>
                            </div>
                        </div>}   
                        
                    </div>
                    <button className={classes.uploadButton} onClick={handLeloadImage}>Upload Image</button>
                    
                    <input ref={hiddenFileInput} onChange={handleLoadImageChange} style={{display:'none'}} type="file" accept="image/png, image/jpeg, image/gif" />
                    {uploadErr && {uploadErr}}
                </div>
            </div>
    )
}
export default UploadImage