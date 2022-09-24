import { useState } from "react";
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
    const [selectedOption, setSelectedOption] = useState({ value: "State", label: "State" });
    console.log(selectedOption);
    const handleChangeAuto = (value)=>{
        setStreet(value)
    }
    const handleSelectAuto = async (address, placeId, suggestion) => {
        const results = await geocodeByAddress(address)
        console.log(results);
        // setAddress(address)
    }
    const handleChangeAddress= (e,changeName)=>{
        setAddress({...address,[changeName]:e.target.value})
    }
    const handleChangeSelected = (e)=>{
        setAddress({...address,state:e.value})
    }
    console.log(address);
    return(
        <div className={classes.address}>
            <h2>Shipping Addresses</h2>
            <h3>Edit delivery address</h3>
            <div className={classes.inputBoxes}>
                <AddressInput title={'First name*'} id={uuidv4()} value={address.firstName} handleChange={(e)=>handleChangeAddress(e,'firstName')} />       
                <AddressInput title={'Last name*'} id={uuidv4()} value={address.lastName} handleChange={(e)=>handleChangeAddress(e,'lastName')} />
                <AddressAutoComplete {...{street,handleChangeAuto,handleSelectAuto}} />
                <AddressInput title={'Apt, suite,etc.(optional)'} id={uuidv4()} value={address.apt} handleChange={(e)=>handleChangeAddress(e,'apt')} />
                <AddressInput title={'City*'} id={uuidv4()} value={address.city} handleChange={(e)=>handleChangeAddress(e,'city')} />
                <div style={{display:'flex', width:'70%', justifyContent:'space-between'}}>
                    <div className={classes.stateBox}>
                        <label className={classes.stateLabel} htmlFor='stateid'>
                            <span>State*</span>
                        </label>
                        <Select
                            className={classes.stateSelect}
                            defaultValue={{ value: "State", label: "State" }}
                            onChange={handleChangeSelected}
                            options={stateList}
                            isSearchable={true}
                        />
                    </div>
                    <AddressInput title={'Zip code*'} id={uuidv4()} value={address.zipCode} handleChange={(e)=>handleChangeAddress(e,'zipCode')} />
                </div>
                <AddressInput title={'Phone number*'} id={uuidv4()} value={address.phone} handleChange={(e)=>handleChangeAddress(e,'phone')} />
            </div>
        </div>
    )
}

export default Address


let stateList = [
    
    { value: "AK", label: "Alaska" },
    { value: "AL", label: "Alabama" },
    { value: "AR", label: "Arkansas" },
    { value: "AS", label: "American Samoa" },
    { value: "AZ", label: "Arizona" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DC", label: "District of Columbia" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "GU", label: "Guam" },
    { value: "HI", label: "Hawaii" },
    { value: "IA", label: "Iowa" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "MA", label: "Massachusetts" },
    { value: "MD", label: "Maryland" },
    { value: "ME", label: "Maine" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MO", label: "Missouri" },
    { value: "MS", label: "Mississippi" },
    { value: "MT", label: "Montana" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "NE", label: "Nebraska" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NV", label: "Nevada" },
    { value: "NY", label: "New York" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "PR", label: "Puerto Rico" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VA", label: "Virginia" },
    { value: "VI", label: "Virgin Islands" },
    { value: "VT", label: "Vermont" },
    { value: "WA", label: "Washington" },
    { value: "WI", label: "Wisconsin" },
    { value: "WV", label: "West Virginia" },
    { value: "WY", label: "Wyoming" }
    ]