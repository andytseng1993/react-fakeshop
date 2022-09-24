import AddressAutoComplete from "./AddressAutoComplete";
import AddressInput from "./AddressInput";
import { v4 as uuidv4 } from 'uuid';
import classes from './AddressForm.module.css'
import Select from 'react-select';

const AddressForm=({address,aptRef,handleChangeAuto,handleSelectAuto,handleChangeAddress,handleChangeSelected})=>{
    const customStyles = {
        control: base => ({
          ...base,
          height: 50,
          minHeight: 50
        })
    }
    return(
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
            </form>
    )
}
export default AddressForm

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