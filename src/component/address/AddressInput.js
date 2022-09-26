import { useState } from 'react'
import classes from './AddressInput.module.css'

const AddressInput=({title,id,value,handleChange,refProp,required,inputMode,pattern})=>{
    const [isFocus,setIsFocus] = useState(false)
    const [error,setError] = useState('')
    const onFocusChange = ()=>{
        setIsFocus(true)
    }
    const onBlurChange = ()=>{
        setIsFocus(false)
        if(value.length ===0){
            return setError(`Please enter a valid ${title}.`)
        }
        setError('')
    }
    
    return(
        <div className={classes.searchBox} onFocus={onFocusChange} onBlur={onBlurChange} >
            <label className={classes.searchLabel} htmlFor={id} style={(isFocus||value)?isFocusStyle:{}} ref={refProp}>
                <span>{title}</span>
            </label>
            <input className={classes.inputBox} id={id} type='text' value={value} 
                   onChange={handleChange} required={required} inputMode={inputMode} pattern={pattern} style={(error&&required)?{borderColor:'red'}:{}}/>
            {(error&&required) && <div className={classes.errorMessage}>{error}</div> }
        </div>
    )
}
export default AddressInput

const isFocusStyle ={
    top: '4px',
    left: '0px',
    fontSize: '13px',
    padding: '1px 5px',
    backgroundColor: 'white',
    zIndex: 15,
    color: 'black', 
}