import classes from './UploadImage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faL, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from 'react';

const UploadImage= ({setUploadPicture})=>{
    const [picture, setPicture] = useState({src:null,width:null,height:null,max: 375,rectSize:null})
    const [isCropping,setIsCropping] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [uploadErr,setUploadErr] = useState('')
    const [position,setPosition] =useState({dragging: false,x: 0, y: 0,rect: null,oldPos: null })
    const hiddenFileInput = useRef(null)
    const [scropPosition,setScropPosition] = useState({scaling:false,x: 0, y: 0,oldPos:null})
    
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
            let scaleWidth =  img.naturalWidth/picture.max
            let scaleHeight = img.naturalHeight/picture.max
            if(scaleWidth<=1 && scaleHeight<= 1) {
                if(scaleWidth<=scaleHeight) setPicture((pre)=>({...pre,width: img.naturalWidth, height: img.naturalHeight,rectSize:scaleWidth}))
                if(scaleWidth>scaleHeight) setPicture((pre)=>({...pre,width: img.naturalWidth, height: img.naturalHeight,rectSize:scaleHeight}))
            }else if (scaleWidth>= scaleHeight) setPicture((pre)=>({...pre,width: img.naturalWidth/scaleWidth, height: img.naturalHeight/scaleWidth,rectSize:img.naturalHeight/scaleWidth}))
            else setPicture(pre=>({...pre,width: img.naturalWidth/scaleHeight, height: img.naturalHeight/scaleHeight,rectSize:img.naturalWidth/scaleHeight}))
            URL.revokeObjectURL(objectUrl);
        }
        setPicture(pre=>({...pre,src:objectUrl}))
        setIsCropping(true)
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
    return (
        <div className={classes.uploadArea}>
                <div className={classes.content}>
                    <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                    <h1 style={{marginBottom:30}}>Profile picture</h1>
                    <div className={classes.uploadImageZone}>
                        {!isCropping &&<div className={`${classes.fileDragZone} ${dragActive ? classes.dragActive : "" }`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrag}> </div>}
                        {isCropping && <img className={classes.uploadImage} style={{width:picture.width,height:picture.height,maxWidth:picture.max,maxHeight:picture.max}} src={picture.src} alt='user picture'></img> }
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
                    <button className={classes.uploadButton} onClick={handLeloadImage}>Upload Image</button>
                    
                    <input ref={hiddenFileInput} onChange={handleLoadImageChange} style={{display:'none'}} type="file" accept="image/png, image/jpeg, image/gif" />
                    {uploadErr && {uploadErr}}
                </div>
            </div>
    )
}
export default UploadImage