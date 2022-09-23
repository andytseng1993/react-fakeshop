import { useState } from "react";
import { geocodeByAddress } from 'react-places-autocomplete';
import classes from './Address.module.css'
import AddressAutoComplete from "./AddressAutoComplete";

const Address= ()=>{
    const [address,setAddress] = useState('')
    
    const handleChange = (value)=>{
        setAddress(value)
    }
    const handleSelect = async (address, placeId, suggestion) => {
        const results = await geocodeByAddress(address)
        console.log(results);
        // setAddress(address)
    }

    return(
        <div className={classes.address}>
            <h2>Shipping Addresses</h2>
            <h3>Edit delivery address</h3>
            <div className={classes.inputBoxes}>
                <div className={classes.searchBox}>
                    <label className={classes.searchLabel}>
                        <span>First name*</span>
                    </label>
                    <input/>
                </div>
                <div className={classes.searchBox}>
                    <label className={classes.searchLabel}>
                        <span>Last name*</span>
                    </label>
                    <input/>
                </div>
                <AddressAutoComplete address={address} handleChange={handleChange} handleSelect={handleSelect} />
                <div className={classes.searchBox}>
                    <label className={classes.searchLabel}>
                        <span>Apt, suite,etc. (optional)</span>
                    </label>
                    <input/>
                </div>
                <div className={classes.searchBox}>
                    <label className={classes.searchLabel}>
                        <span>City*</span>
                    </label>
                    <input/>
                </div>
                <div style={{display:'flex'}}>
                    <div className={classes.searchBox}>
                        <label className={classes.searchLabel}>
                            <span>State*</span>
                        </label>
                        <select>
                            <option>LA</option>
                        </select>
                    </div>
                    <div className={classes.searchBox}>
                        <label className={classes.searchLabel}>
                            <span>Zip code*</span>
                        </label>
                        <input/>
                    </div>
                </div>
                <div className={classes.searchBox}>
                    <label className={classes.searchLabel}>
                        <span>Phone number*</span>
                    </label>
                    <input/>
                </div>
            </div>
        </div>
    )
}

export default Address