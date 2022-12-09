import classes from './UploadImage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from 'react';
import {image64toCanvasRef, extractImageFileExtensionFromBase64 } from './Base64CropImage'
import { useUserAuth } from '../../context/UserAuthContext';
import { deleteObject, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useUserData } from '../../context/UserDataContext';
import { useDispatch } from 'react-redux';
import { upLoadNewImage } from '../../redux/actions';
import { nanoid } from 'nanoid';

const UploadImage= ({setUploadPicture,pictureName,freshPage,setFreshPage})=>{
    const [picture, setPicture] = useState({src:null,imgSrcExt:null,width:null,height:null,max: 500,rectSize:null,aspectRatio:null})
    const [isCropping,setIsCropping] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [uploadErr,setUploadErr] = useState('')
    const [position,setPosition] =useState({dragging: false,x: 0, y: 0,rect: null,oldPos: null })
    const [scropPosition,setScropPosition] = useState({scaling:false,x: 0, y: 0,oldPos:null})
    const imageRef = useRef(null)
    const hiddenFileInput = useRef(null)
    const {currentUser}=useUserAuth()
    const { writeUserData } = useUserData()
    const dispatch = useDispatch()
    const uploadTaskRef = useRef();
    const [uploading,setUploading] = useState(false)
    const [uploadingProgress,setUploadingProgress] = useState(0)


    
    const closeHandler =()=>{
        setUploadPicture(false)
        setPicture(pre=>({...pre,src:null}))
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
    
    const handleLoadImage =(event)=>{
        hiddenFileInput.current.click()
    }
    const handleLoadImageChange =(event)=>{
        handleImage(event.target.files[0])
        
    }
    const handleImage = (file)=>{
        if(file.type!=='image/png'&& file.type!=='image/jpeg' && file.type!=='image/gif') return setUploadErr('Please upload png, jpeg or gif image.')
        if(file.size > 1024*1024*3) return setUploadErr('Please upload a picture smaller than 3 MB.')
        let img = new Image()
        let reader = new FileReader();
        reader.readAsDataURL(file)
        setUploadErr('')
        reader.onload = ()=>{
            img.src = reader.result
            const fileExtension = extractImageFileExtensionFromBase64(reader.result)
            setPicture(pre=>({...pre,src:reader.result,imgSrcExt:fileExtension}))
        }
        img.onload = function () {
            let scaleWidth =  img.naturalWidth/picture.max
            let scaleHeight = img.naturalHeight/picture.max
            if(scaleWidth<=1 && scaleHeight<= 1) {
                if(scaleWidth<=scaleHeight) setPicture((pre)=>({...pre,width: img.naturalWidth, height: img.naturalHeight,rectSize:scaleWidth,aspectRatio:scaleWidth}))
                if(scaleWidth>scaleHeight) setPicture((pre)=>({...pre,width: img.naturalWidth, height: img.naturalHeight,rectSize:scaleHeight,aspectRatio:scaleHeight}))
            }else if (scaleWidth>= scaleHeight) setPicture((pre)=>({...pre,width: img.naturalWidth/scaleWidth, height: img.naturalHeight/scaleWidth,rectSize:img.naturalHeight/scaleWidth,aspectRatio:scaleWidth}))
            else setPicture(pre=>({...pre,width: img.naturalWidth/scaleHeight, height: img.naturalHeight/scaleHeight,rectSize:img.naturalWidth/scaleHeight,aspectRatio:scaleHeight}))
            
            setIsCropping(true)
        }
        
        setPosition({dragging: false,x: 0, y: 0,rect: null,oldPos: null })
        
    }

    const handleMouseMove = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        if (position.dragging){
            let x = e.pageX  - position.oldPos.x + position.x
            let y = e.pageY - position.oldPos.y + position.y
            if(x<0) x= 0
            if(x > (picture.width-picture.rectSize)) x= picture.width-picture.rectSize
            if(y<0) y= 0
            if(y> (picture.height-picture.rectSize)) y= picture.height-picture.rectSize
            setPosition(pre=>({...pre,x,y,oldPos:{x:e.clientX,y:e.clientY}}))
        }
        if(scropPosition.scaling){
            let x= e.clientX - scropPosition.oldPos.x
            let y= e.clientY - scropPosition.oldPos.y
            if(picture.width-picture.rectSize-position.x-x <=0 || picture.height-picture.rectSize-position.y-y <=0){
                x = 0
                y= 0
            }
            let newRectSize = picture.rectSize+(x+y)/2
            setPicture((pre)=>({...pre,rectSize:newRectSize}))
            setScropPosition(pre => ({...pre,x,y,oldPos:{x:e.clientX,y:e.clientY}}))
        }
    
    }
    const hadleMouseDown = (e)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault()
        let rect = e.currentTarget.getBoundingClientRect()
        setPosition(pre=>({...pre,dragging: true,rect:{x:rect.x,y:rect.y},oldPos:{x:e.clientX,y:e.clientY}}))
        
    }
    const handleMouseUp = (e)=>{
        setPosition(pre=>({...pre,dragging: false}))
        setScropPosition(pre => ({...pre,scaling:false}))
        e.stopPropagation()
        e.preventDefault()
    }
    const handleMouseLeave = (e)=>{
        setPosition(pre=>({...pre,dragging: false}))
    }
    const handleCropMouseDown = (e)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault()
        setScropPosition(pre => ({...pre,scaling:true,oldPos:{x:e.clientX,y:e.clientY}}))
    }
    const handleCropMouseMove = (e)=>{
        if(!scropPosition.scaling) return
        let x= e.clientX - scropPosition.oldPos.x
        let y= e.clientY - scropPosition.oldPos.y
        
        if(picture.width-picture.rectSize-position.x-x <=0 || picture.height-picture.rectSize-position.y-y <=0){
            x = 0
            y= 0
        }
        let newRectSize = picture.rectSize+(x+y)/2
            

        setPicture((pre)=>({...pre,rectSize:newRectSize}))
        setScropPosition(pre => ({...pre,x,y,oldPos:{x:e.clientX,y:e.clientY}}))
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault()
    }
    const handleCropMouseUp = (e)=>{
        setScropPosition(pre => ({...pre,scaling:false}))
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault()
    }
    const handleSaveImage = async (e)=>{
        e.preventDefault()
        const pixelCrop = {
            x:position.x*picture.aspectRatio,
            y:position.y*picture.aspectRatio,
            width:picture.rectSize*picture.aspectRatio,
            height:picture.rectSize*picture.aspectRatio
        }
        const newblob = image64toCanvasRef(pixelCrop,imageRef.current,picture.imgSrcExt)
        newblob.then((blob)=>{
            const storage = getStorage()
            const name = nanoid()
            const metadata = {contentType: `image/${picture.imgSrcExt}`}
            const storageRef = ref(storage, '/users/'+currentUser.uid+'/images/'+name+'.'+ picture.imgSrcExt);
            setUploading(true)
            uploadTaskRef.current = uploadBytesResumable(storageRef, blob,metadata)
            uploadTaskRef.current.on('state_changed',(snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadingProgress(progress)
            },
            (error) => {
                setUploading(false)
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.error('User doesn\'t have permission to access the object'); 
                        break;
                    case 'storage/canceled':
                        console.error('User canceled the upload')
                        break;
                    case 'storage/unknown':
                        console.error('Unknown error occurred, inspect error.serverResponse');
                        break;
                }
            },
            ()=>{
                writeUserData('users/'+currentUser.uid+'/profileImage/'+name,picture.imgSrcExt)
                if(pictureName.name){
                    const desertRef = ref(storage, '/users/'+currentUser.uid+'/images/'+pictureName.name+'.'+pictureName.extension);
                    deleteObject(desertRef).then(() => {
                        writeUserData('users/'+currentUser.uid+'/profileImage/'+pictureName.name,{})
                    }).then(()=>{
                        setFreshPage(!freshPage)
                        setUploadPicture(false)
                        setPicture(pre=>({...pre,src:null}))
                        setIsCropping(false)
                        setUploading(false)
                        dispatch(upLoadNewImage())
                    }).catch((error) => {
                        console.log(error);
                    });
                }   
            })
        }).catch((err)=>{
            console.error(err)
            setUploading(false)
        })
        
    }
    const UploadCancel=()=>{
        uploadTaskRef.current.cancel()
    }
    
    return (
        <div className={classes.uploadArea}>
            <div className={classes.content}>
                <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                <h1 style={{marginBottom:30}}>Profile picture</h1>
                <div className={classes.uploadImageZone}>
                    {!isCropping &&<div className={`${classes.fileDragZone} ${dragActive ? classes.dragActive : "" }`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrag}></div>}
                    {isCropping && <img className={classes.uploadImage} style={{width:picture.width,height:picture.height,maxWidth:picture.max,maxHeight:picture.max}} src={picture.src} alt='user' ref={imageRef}></img> }
                    {isCropping && 
                    (<div className={classes.uploadImageBackground} onMouseLeave={handleCropMouseUp} onMouseUp={handleCropMouseUp} onMouseMove={handleCropMouseMove}>
                        <div className={classes.uploadImageSquare} style={{left:position.x,top:position.y,width:picture.rectSize,height:picture.rectSize}} 
                        onMouseMove={handleMouseMove} onMouseDownCapture={hadleMouseDown} onMouseUp = {handleMouseUp} onMouseLeave={handleMouseLeave}
                        >
                            <div className={classes.uploadImageCircle}></div>
                        </div>
                        <div className={classes.SECircle} style={{left:picture.rectSize+position.x,top:picture.rectSize+position.y}} 
                        onMouseDown={handleCropMouseDown} onMouseUp={handleCropMouseUp} onMouseMove={handleCropMouseMove} ></div>
                    </div>)}   
                </div>
                <div>
                    {uploading?
                        uploadingProgress<100?
                        (<div className={classes.uploadingZone} >
                            <div className={classes.uploading}>
                                <div className={classes.uploadingProgress} style={{width: uploadingProgress+'%'}}></div>
                                <div className={classes.uploadingContent}>Uploading...please wait!</div>
                            </div>
                            <button className={classes.uploadingCancel} onClick={UploadCancel}>Cancel</button>
                        </div>)
                        :(<div className={classes.uploadingSucceed}>Succeed!</div>)
                        :
                        <>
                            <button className={classes.uploadButton} onClick={handleLoadImage}>
                                {!isCropping?'Select Image':'Select Other Image'}
                            </button>
                            {isCropping && <button className={classes.uploadButton} onClick={handleSaveImage}>Save</button>}
                            <input ref={hiddenFileInput} onChange={handleLoadImageChange} style={{display:'none'}} type="file" accept="image/png, image/jpeg, image/gif" />
                        </>
                    }   
                </div>
                {uploadErr && <div className={classes.error}>{uploadErr}</div>}
            </div>
        </div>
    )
}
export default UploadImage