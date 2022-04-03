import { useEffect, useState } from 'react';
import classes from './MvArea.module.css'

function MvArea(){
    const [scroll,setScroll] = useState(false)

    const scrollCheck = ()=>{ 
        if(window.scrollY>0) return setScroll(true)
        else return setScroll(false)
    }
    useEffect(()=>{
        window.removeEventListener('scroll',scrollCheck)
        window.addEventListener('scroll',scrollCheck)
        return ()=>window.removeEventListener('scroll',scrollCheck)
    },[scroll])
    return (
        <div className={classes.mvArea}>
            <ul className={classes.mvList}>
                <li></li>
                <li></li>
            </ul>    
        </div>
    )
}

export default MvArea;