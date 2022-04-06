import { useEffect, useState } from 'react';
import classes from './MvArea.module.css'

function MvArea(){
    const [scroll,setScroll] = useState(false)
    const scrollClass = scroll? classes.scroll:''
    const scrollCheck = ()=>{ 
        if(window.scrollY> 0) return setScroll(true)
        else return setScroll(false)
    }

    useEffect(()=>{
        
        window.addEventListener('scroll',scrollCheck)
        return ()=>window.removeEventListener('scroll',scrollCheck)
    },[])
    return (
        <div className={`${classes.mvArea} ${scrollClass}`}>
            <div className={classes.mvText}>
                <h1>Fake is Life!</h1>
                <h2>FakeStore makes your life better.</h2>
            </div>
            <ul className={classes.mvList}>
                <li className={classes.image1}></li>
                <li className={classes.image2}></li>
            </ul> 
            <div className={classes.scrollDown}>
                scroll
            </div>
            <div className={classes.mainTitle}>
                <h1>Fake is Life!</h1>
                <h2>Welcome to Fake store!</h2>
            </div>   
        </div>
    )
}

export default MvArea;