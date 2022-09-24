import { useRef, useState } from "react";
import { geocodeByAddress } from 'react-places-autocomplete';
import classes from './Address.module.css'
import AddressAutoComplete from "./AddressAutoComplete";
import AddressInput from "./AddressInput";
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:''}

const Address= ()=>{
    const [address,setAddress] = useState(initialAddress)
    const [street,setStreet] = useState('')
    const aptRef = useRef(null)
    
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
    const customStyles = {
        control: base => ({
          ...base,
          height: 50,
          minHeight: 50
        })
    }
    return(
        <div className={classes.address}>
            <h1>Shipping Address</h1>
            <h3 style={{marginTop:10}}>Edit delivery address</h3>
            <form className={classes.inputBoxes}>
                <AddressInput title={'First name*'} id={uuidv4()} value={address.firstName} handleChange={(e)=>handleChangeAddress(e,'firstName')} required='required'/>       
                <AddressInput title={'Last name*'} id={uuidv4()} value={address.lastName} handleChange={(e)=>handleChangeAddress(e,'lastName')} required='required'/>
                <AddressAutoComplete street={address.street} handleChangeAuto={handleChangeAuto} handleSelectAuto={handleSelectAuto} />
                <AddressInput title={'Apt, suite,etc.(optional)'} id={uuidv4()} value={address.apt} handleChange={(e)=>handleChangeAddress(e,'apt')} refProp={aptRef} />
                <AddressInput title={'City*'} id={uuidv4()} value={address.city} handleChange={(e)=>handleChangeAddress(e,'city')} required='required'/>
                <div style={{display:'flex', width:'70%', justifyContent:'space-between'}}>
                    <div className={classes.stateBox}>
                        <label className={classes.stateLabel} htmlFor='stateid'>
                            <span>State*</span>
                        </label>
                        <Select
                            className={classes.stateSelectContainer}
                            value={{label:address.state}}
                            onChange={handleChangeSelected}
                            options={stateList}
                            isSearchable={true}
                            styles={customStyles}
                        />
                    </div>
                    <AddressInput title={'Zip code*'} id={uuidv4()} value={address.zipCode} handleChange={(e)=>handleChangeAddress(e,'zipCode')} required='required' />
                </div>
                <AddressInput title={'Phone number*'} id={uuidv4()} value={address.phone} handleChange={(e)=>handleChangeAddress(e,'phone')} required='required' />
                <div>
                    <button>Cancel</button>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Address


let stateList = [
    
    { value: "AK", label: "AK" },
    { value: "AL", label: "AL" },
    { value: "AR", label: "AR" },
    { value: "AS", label: "AS" },
    { value: "AZ", label: "AZ" },
    { value: "CA", label: "CA" },
    { value: "CO", label: "CO" },
    { value: "CT", label: "CT" },
    { value: "DC", label: "DC" },
    { value: "DE", label: "DE" },
    { value: "FL", label: "FL" },
    { value: "GA", label: "GA" },
    { value: "GU", label: "GU" },
    { value: "HI", label: "HI" },
    { value: "IA", label: "IA" },
    { value: "ID", label: "ID" },
    { value: "IL", label: "IL" },
    { value: "IN", label: "IN" },
    { value: "KS", label: "KS" },
    { value: "KY", label: "KY" },
    { value: "LA", label: "LA" },
    { value: "MA", label: "MA" },
    { value: "MD", label: "MD" },
    { value: "ME", label: "ME" },
    { value: "MI", label: "MI" },
    { value: "MN", label: "MN" },
    { value: "MO", label: "MO" },
    { value: "MS", label: "MS" },
    { value: "MT", label: "MT" },
    { value: "NC", label: "NC" },
    { value: "ND", label: "ND" },
    { value: "NE", label: "NE" },
    { value: "NH", label: "NH" },
    { value: "NJ", label: "NJ" },
    { value: "NM", label: "NM" },
    { value: "NV", label: "NV" },
    { value: "NY", label: "NY" },
    { value: "OH", label: "OH" },
    { value: "OK", label: "OK" },
    { value: "OR", label: "OR" },
    { value: "PA", label: "PA" },
    { value: "PR", label: "PR" },
    { value: "RI", label: "RI" },
    { value: "SC", label: "SC" },
    { value: "SD", label: "SD" },
    { value: "TN", label: "TN" },
    { value: "TX", label: "TX" },
    { value: "UT", label: "UT" },
    { value: "VA", label: "VA" },
    { value: "VI", label: "VI" },
    { value: "VT", label: "VT" },
    { value: "WA", label: "WA" },
    { value: "WI", label: "WI" },
    { value: "WV", label: "WV" },
    { value: "WY", label: "WY" }
    ]