import classes from './CheckoutAddress.module.css'
import { useEffect, useState } from "react"
import AddressForm from "../address/AddressForm"
import { getDatabase,ref ,onValue, query, orderByChild} from "firebase/database";
import { useSelector } from 'react-redux';


const CheckoutAddress = ({currentUser,address,setAddress,handleCancel,handleSave})=>{
    const [isLoad,setIsLoad] = useState(true)
    const [addresses,setAddresses]= useState([])
    const [checked,setChecked]=useState(false)
    const db = getDatabase()
    const [addNewAddress,setAddNewAddress]= useState(false)

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
        console.log('123');
    }

    if(isLoad) return(<div>Loading</div>)
    return (
        <>
            {addresses.length !==0? 
                (   <form onSubmit={handleAddressFormSubmit}>
                        {addresses.map((addressRadio)=>(                          
                            <label htmlFor={addressRadio.key} key={addressRadio.key} className={classes.label}>
                            <input type="radio" id={addressRadio.key} onChange={()=>handleAddressChange(addressRadio)} checked={addressRadio.key === address.key} />
                                <div className={classes.addressSummary}>
                                    <div className={classes.addressName}>{addressRadio.firstName} {addressRadio.lastName}</div>
                                    <div className={classes.addressStreet}>{addressRadio.street} {addressRadio.apt}</div>
                                    <div className={classes.addressCity}>{addressRadio.city}, {addressRadio.state} {addressRadio.zipCode}</div>
                                    <div className={classes.addressPhone}>Phone number: {addressRadio.phone}</div>
                                </div>
                            </label>
                            
                        ))}
                        <button onClick={handleAddAdress}>+Add a Address</button>
                        <button type='submit'>Save</button>

                    </form>
                )
                :
                <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave}} />
            }
            {addNewAddress && <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave}} />}
        </>
    )
}
export default CheckoutAddress