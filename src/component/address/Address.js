import { useState } from "react";
import classes from './Address.module.css'
import AddressForm from "./AddressForm";
import { useUserData } from "../../context/UserDataContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { NavLink} from "react-router-dom"

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:''}

const Address= ()=>{
    const [address,setAddress] = useState(initialAddress)
    const [checked,setChecked]=useState(false)
    const [error,setError] = useState('')
    const { readUserData,writeUserData } = useUserData()
    const {currentUser}  = useUserAuth()
    const navigate = useNavigate()

    const handleCancel =(e)=>{
        e.preventDefault()
        navigate('/account/addresses')
    }
    const handleSave =(e)=>{
        e.preventDefault()
        if(address.firstName.trim()===''||address.lastName.trim()===''||
        address.street.trim()===''||address.city.trim()===''||
        address.zipCode.trim()===''||address.phone.trim()===''){
            return setError('Please verify all fields below.')
        }
        setError('')
        const key = uuidv4()
        const createTime = Date.now()
        const addressData = {...address,key,default:checked,createTime}
        if(checked){
            return editAddressData(key,addressData)
        }
        writeUserData('users/'+currentUser.uid+'/addresses/'+key,addressData)
        navigate('/account/addresses')
    }
    const editAddressData = async(addressKey,data)=>{
        await readUserData('users/'+currentUser.uid+'/addresses')
        .then(res=>{
            for(let key in res.val()){
                if(res.val()[key].default){
                    writeUserData('users/'+currentUser.uid+'/addresses/'+key+'/default', false)
                }
            }
            writeUserData('users/'+currentUser.uid+'/addresses/'+addressKey,data)
            navigate('/account/addresses')
        })  
}
    
    return(
        <div className={classes.address}>
            <div className={classes.routes}>
                <NavLink to='/account'>Account </NavLink>/<NavLink to='/account/addresses'> Addresses</NavLink> / <span style={{fontWeight:700}}> Add New Addresses</span>
            </div>
            <h1>Add new delivery address</h1>
            {error && <div className={classes.errorMessage}><FontAwesomeIcon className={classes.exclamation} icon={faTriangleExclamation} />{error}</div>}
            <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave}} />
        </div>
    )
}

export default Address
