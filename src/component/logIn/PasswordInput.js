import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react"
import classes from './PasswordInput.module.css'

const PasswordInput=({name,password,handleChange,keyName})=>{
    const [hide,setHide] = useState(true)
    const hideHandler=()=>{
        setHide(!hide)
    }
    const handleInputChange=(event)=>{
        const data={
            [keyName]:event.target.value
        }
        handleChange(data)
    }
    return(
        <div className={classes.passwordArea}>
            <div className={classes.password}>{name}</div>
            <input type={hide?'password':'text'} required id='password' value={password} onChange={handleInputChange} placeholder={name}></input>
            <div className={classes.hide} onClick={hideHandler}>
                {
                    hide? <FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/> 
                }
            </div>
        </div>
    )
}
export default PasswordInput