import { useEffect, useState } from 'react';
import classes from './MvArea.module.css'

function MvArea(){
    const [scroll,setScroll] = useState(false)
    const scrollClass = scroll? classes.scroll:''
    const scrollCheck = ()=>{ 
        if(window.scrollY>0) return setScroll(true)
        else return setScroll(false)
    }

    useEffect(()=>{
        
        window.addEventListener('scroll',scrollCheck)
        return ()=>window.removeEventListener('scroll',scrollCheck)
    },[])
    return (
        <div className={`${classes.mvArea} ${scrollClass}`}>
            <ul className={classes.mvList}>
                <li className={classes.image1}></li>
                <li className={classes.image2}></li>
            </ul>    
        </div>
    )
}

export default MvArea;