import { useState } from "react";
import classes from './Address.module.css'
import AddressForm from "./AddressForm";
import { geocodeByAddress } from 'react-places-autocomplete';
import { useUserData } from "../../context/UserDataContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { v4 as uuidv4 } from 'uuid';

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:''}

const Address= ()=>{
    const [address,setAddress] = useState(initialAddress)
    const [checked,setChecked]=useState(false)
    const { writeUserData } = useUserData()
    const {currentUser}  = useUserAuth()

    const handleCancel =(e)=>{
        e.preventDefault()
    }
    const handleSave =(e)=>{
        e.preventDefault()
        console.log('2222');
        if(address.firstName.trim()===''||address.lastName.trim()===''||
        address.street.trim()===''||address.city.trim()===''||
        address.zipCode.trim()===''||address.phone.trim()===''){
            return
        }
        const key = uuidv4()
        const addressData = {...address,key,default:checked}
        // writeUserData('users/'+currentUser.uid+'/addresses/'+key,addressData)
    }
    const handleChangePhone =(value)=>{
        setAddress(pre=>{return{...pre,phone:value}})
    }
    console.log(address);
    return(
        <div className={classes.address}>
            <h1>Shipping Address</h1>
            <h3 style={{marginTop:20}}>Edit delivery address</h3>
            <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave,handleChangePhone}} />
        </div>
    )
}

export default Address
