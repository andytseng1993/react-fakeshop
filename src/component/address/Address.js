import { useRef, useState } from "react";
import classes from './Address.module.css'
import AddressForm from "./AddressForm";
import { geocodeByAddress } from 'react-places-autocomplete';

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:''}

const Address= ()=>{
    const [address,setAddress] = useState(initialAddress)
    const aptRef = useRef(null)
    const [checked,sethecked]=useState(false)

    const handleChangeAuto = (value)=>{
        setAddress(pre=>{return{...pre,street :value}})
    }
    const handleSelectAuto = async (value,placeId,suggestion) => {
        setAddress((pre)=>{return{...pre,street:suggestion.formattedSuggestion.mainText}})
        await geocodeByAddress(value)
            .then(results=>{
                results[0].address_components?.forEach(entry => {
                    if(entry.types[0] === "administrative_area_level_1"){setAddress((pre)=>{return{...pre,state:entry.short_name}})}
                    if(entry.types[0] === "locality"){setAddress(pre=>{return{...pre,city:entry.short_name}})}
                    if (entry.types?.[0] === "postal_code"){setAddress(pre=>{return{...pre,zipCode:entry.long_name}})}
                })
                aptRef.current.focus()
            })
    }
    const handleChangeAddress= (e,changeName)=>{
        setAddress(pre=>{return{...pre,[changeName]:e.target.value}})
    }
    const handleChangeSelected = (e)=>{
        setAddress(pre=>{return{...pre,state:e.value}})
    }
    const handleCancel =(e)=>{
        e.preventDefault()
    }
    const handleSave =(e)=>{
        e.preventDefault()
    }
    return(
        <div className={classes.address}>
            <h1>Shipping Address</h1>
            <h3 style={{marginTop:20}}>Edit delivery address</h3>
            <AddressForm {...{address,aptRef,handleChangeAuto,handleSelectAuto,handleChangeAddress,handleChangeSelected}} />
            <label className={classes.checkboxlabel}>
                <input type='checkbox' className={classes.checkbox} value={checked} onChange={()=>sethecked(!checked)}/>
                <span>Set as my preferred delivery address</span> 
            </label>
            <div className={classes.buttons} >
                <button className={classes.buttonCancel} onClick={handleCancel}>Cancel</button>
                <button className={classes.buttonSave} onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default Address
