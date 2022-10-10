import classes from './CheckoutAddress.module.css'
import { useEffect, useState } from "react"
import AddressForm from "../address/AddressForm"
import { getDatabase,ref ,onValue, query, orderByChild} from "firebase/database";
import { useUserAuth } from "../../context/UserAuthContext";

const CheckoutAddress = ({address,setAddress,handleCancel,handleSave})=>{
    const [addresses,setAddresses]= useState([])
    const [checked,setChecked]=useState(false)
    const db = getDatabase()
    const { currentUser }  = useUserAuth()

    useEffect(()=>{
        const preferrAddress = []
        const addressesData =[]
        let isCancel = false
        const readAddressData = ()=>{
            if(!currentUser) return
            const topUserPostsRef = query(ref(db, 'users/'+currentUser.uid+'/addresses'), orderByChild('createTime'))
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

    return (
        <>
            {addresses.length !==0? 
                
                (   <form>
                        {addresses.map((addressRadio)=>(
                            
                            <label htmlFor={addressRadio.key} key={addressRadio.key}>
                            <input type="radio" id={addressRadio.key} onChange={()=>handleAddressChange(addressRadio)} checked={addressRadio.key === address.key} />
                    
                                    <div className={classes.addressName}>{addressRadio.firstName} {addressRadio.lastName}</div>
                                    <div className={classes.addressStreet}>{addressRadio.street} {addressRadio.apt}</div>
                                    <div className={classes.addressCity}>{addressRadio.city}, {addressRadio.state} {addressRadio.zipCode}</div>
                                    <div className={classes.addressPhone}>Phone number: {addressRadio.phone}</div>
                            </label>
                            
                        ))}
                    </form>
                )
                :
                <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave}} />
            }
        </>
    )
}
export default CheckoutAddress