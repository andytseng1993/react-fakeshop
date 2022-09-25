import { useState } from "react";
import classes from './Address.module.css'
import AddressForm from "./AddressForm";
import { useUserData } from "../../context/UserDataContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:''}

const Address= ()=>{
    const [address,setAddress] = useState(initialAddress)
    const [checked,setChecked]=useState(false)
    const [error,setError] = useState('')
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
            return setError('Please verify all fields below.')
        }
        setError('')
        const key = uuidv4()
        const addressData = {...address,key,default:checked}
        // writeUserData('users/'+currentUser.uid+'/addresses/'+key,addressData)
    }
    
    
    return(
        <div className={classes.address}>
            <h1>Shipping Address</h1>
            <h3 style={{margin:10}}>Edit delivery address</h3>
            {error && <div className={classes.errorMessage}><FontAwesomeIcon className={classes.exclamation} icon={faTriangleExclamation} />{error}</div>}
            <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave}} />
        </div>
    )
}

export default Address
