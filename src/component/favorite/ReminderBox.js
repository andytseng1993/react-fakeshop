import { useState, useEffect } from 'react'
import classes from './ReminderBox.module.css'
const ReminderBox=({currentUser,favorited})=>{
    const [text,setText] = useState('')
    useEffect(() => {
      if(favorited) return setText('Remove it from your \u2764s!')
      if(!currentUser) return setText('Click to sign in and save!')
      setText('Keep it in favorite!')
    }, [currentUser,favorited])
    
    return(
        <div  className={classes.box}>
            {text}
        </div>
    )
}
export default ReminderBox