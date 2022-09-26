import { useEffect, useState } from "react";
import classes from './AddressEdit.module.css'
import AddressForm from "./AddressForm";
import { useUserData } from "../../context/UserDataContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink} from "react-router-dom"

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:''}

const AddressEdit= ()=>{
    const {productKey} = useParams()
    const [address,setAddress] = useState(initialAddress)
    const [checked,setChecked]=useState(false)
    const [error,setError] = useState('')
    const { readUserData,writeUserData } = useUserData()
    const {currentUser}  = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        let isCancel = false
        const readAddressDate = async()=>{
            await readUserData('users/'+currentUser.uid+'/addresses/'+productKey)
            .then(res=>{
                if(!isCancel){
                    setAddress(res.val());
                    setChecked(res.val().default)
                }
            })  
        }
        readAddressDate()
        return () => {
            isCancel = true 
        }
    }, [])

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
        const addressData = {...address,default:checked}
        if(checked){
            return editAddressData(address.key,addressData)
        }
        writeUserData('users/'+currentUser.uid+'/addresses/'+address.key,addressData)
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
                <NavLink to='/account'>Account </NavLink>/<NavLink to='/account/addresses'> Addresses</NavLink> / <span style={{fontWeight:700}}> Edit Address</span>
            </div>
            <h1 style={{margin:10}}>Edit delivery address</h1>
            {error && <div className={classes.errorMessage}><FontAwesomeIcon className={classes.exclamation} icon={faTriangleExclamation} />{error}</div>}
            <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave}} />
        </div>
    )
}

export default AddressEdit
