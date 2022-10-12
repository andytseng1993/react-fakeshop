import classes from './CheckoutAddress.module.css'
import { useEffect, useState } from "react"
import AddressForm from "../address/AddressForm"
import { getDatabase,ref ,onValue, query, orderByChild} from "firebase/database";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import { isValidPhoneNumber } from "react-phone-number-input";
import { useUserData } from '../../context/UserDataContext';

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:'',key:''}

const CheckoutAddress = ({currentUser,address,setAddress,handleCancel,handleSave,emailValue,seteEmailValue})=>{
    const [isLoad,setIsLoad] = useState(true)
    const [addresses,setAddresses]= useState([])
    const [checked,setChecked]=useState(false)
    const db = getDatabase()
    const [addNewAddress,setAddNewAddress]= useState(false)
    const [addNewAddressChecked,setAddNewAddressChecked]= useState(false)
    const [addNewAddressForm,setAddNewAddressForm] = useState(initialAddress)
    const [error,setError] = useState('')
    const { readUserData,writeUserData } = useUserData()

    useEffect(()=>{
        const preferrAddress = []
        const addressesData =[]
        let isCancel = false
        const readAddressData = ()=>{
            if(currentUser==='') return
            if(currentUser===null) return setIsLoad(false)
            const topUserPostsRef = query(ref(db, 'users/'+currentUser?.uid+'/addresses'), orderByChild('createTime'))
            onValue(topUserPostsRef, (snapshot) => {
                snapshot.forEach((childSnapshot)=> {
                    if(!isCancel){
                        if(childSnapshot.val().default){
                            preferrAddress.push(childSnapshot.val())
                            setAddress(childSnapshot.val())
                        }else{
                            addressesData.unshift(childSnapshot.val())
                        }
                    }
                  })
                  const Alladdress =  preferrAddress.concat(addressesData)
                  setAddresses(Alladdress)
                  setIsLoad(false)
            })
        }
        readAddressData()
        return ()=>{
            isCancel = true
        }
        // eslint-disable-next-line
    },[currentUser])
    const handleAddressChange = (address)=>{
        setAddress(address)
    }
    const handleAddAdress = (e)=>{
        e.preventDefault()
        setAddNewAddress(true)
    }
    const handleAddressFormSubmit = (e)=>{
        e.preventDefault()
        seteEmailValue(currentUser.email)
        handleSave()
    }
    const closeHandler =()=>{
        setAddNewAddress(false)
        setAddNewAddressForm(initialAddress)
    }
    const addNewAddressSave =(e)=>{
        e.preventDefault()
        if(addNewAddressForm.firstName.trim()===''||addNewAddressForm.lastName.trim()===''||
        addNewAddressForm.street.trim()===''||addNewAddressForm.city.trim()===''||
        addNewAddressForm.zipCode.trim()===''||addNewAddressForm.phone.trim()===''){
            return setError('Please verify all fields below.')
        }
        if(!isValidPhoneNumber(addNewAddressForm.phone)) return setError('Invalid phone number')
        setError('')
        const key = uuidv4()
        const createTime = Date.now()
        const addressData = {...addNewAddressForm,key,default:addNewAddressChecked,createTime}
        if(addNewAddressChecked){
            return editAddressData(key,addressData)
        }
        writeUserData('users/'+currentUser.uid+'/addresses/'+key,addressData)
        setAddress(addNewAddressForm)
        seteEmailValue(currentUser.email)
        handleSave()
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
            setAddress(addNewAddressForm)
            seteEmailValue(currentUser.email)
            handleSave()

        })  
    }

    if(isLoad) return(<div>Loading</div>)
    if(currentUser===null){ 
        return(
            <div style={{paddingBottom: 30}}>
                <AddressForm emailInput='true' defaultAddress='false' btnName='Use this Address' {...{address,setAddress,handleCancel,handleSave,emailValue,seteEmailValue}} />
            </div>
        )}
    return (
        <div>
            {addresses.length !==0? 
                (   <form onSubmit={handleAddressFormSubmit}>
                        {addresses.map((addressRadio)=>(                          
                            <label htmlFor={addressRadio.key} key={addressRadio.key} className={`${classes.label} ${addressRadio.key === address.key?classes.checked:''}`}>
                                <input type="radio" id={addressRadio.key} onChange={()=>handleAddressChange(addressRadio)} checked={addressRadio.key === address.key} />
                                <div className={classes.addressBox}>
                                    <div className={classes.addressSummary}>
                                        <div className={classes.addressName}>{addressRadio.firstName} {addressRadio.lastName}
                                            <span className={classes.addressStreet}>{addressRadio.street} {addressRadio.apt}, {addressRadio.city}, {addressRadio.state} {addressRadio.zipCode}</span>   
                                        </div>
                                    </div>
                                    <div className={classes.addressPhone}>Phone number: {addressRadio.phone}</div>
                                </div>
                            </label>
                            
                        ))}
                            <button className={classes.addAddress} onClick={handleAddAdress}>+ Add a Address</button>
                        <div style={{display:'flex',justifyContent: 'flex-end' }}>
                            <button className={classes.addAddressSubmit} type='submit'>Use this Address</button>
                        </div>

                    </form>
                )
                :
                <div style={{paddingBottom: 30}}>
                    <AddressForm btnName='Use this Address' address={addNewAddressForm} setAddress={setAddNewAddressForm} handleSave={addNewAddressSave} 
                         checked={addNewAddressChecked} setChecked={setAddNewAddressChecked} handleCancel={closeHandler} />
                </div>
            }
            {addNewAddress && 
            (   <div className={classes.addNewAddressArea}>
                    <div className={classes.content}>
                        <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                        <div style={{fontSize:'2rem'}}>Add a new address</div>
                        {error && <div className={classes.errorMessage}><FontAwesomeIcon className={classes.exclamation} icon={faTriangleExclamation} />{error}</div>}
                        <AddressForm btnName='Use this Address' address={addNewAddressForm} setAddress={setAddNewAddressForm} handleSave={addNewAddressSave} 
                         checked={addNewAddressChecked} setChecked={setAddNewAddressChecked} handleCancel={closeHandler} />
                    </div>
                </div>
            )}
        </div>
    )
}
export default CheckoutAddress