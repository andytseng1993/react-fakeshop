import { useEffect, useState } from "react"
import { NavLink} from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { useUserData } from "../../context/UserDataContext"
import classes from './AddressList.module.css'

const AddressList = ()=>{
    const { readUserData } = useUserData()
    const {currentUser}  = useUserAuth()
    const [addresses,setAddresses]= useState([])
    useEffect(()=>{
        const addresses =[]
        let isCancel = false
        readUserData('users/'+currentUser.uid+'/addresses')
        .then(res=>{
            if(!isCancel){
                for(let key in res.val()){
                    const review={...res.val()[key]}
                    if(res.val()[key].default){
                        addresses.unshift(review)
                    }else{
                        addresses.push(review)
                    }
                }
                setAddresses(addresses);
            }
        })
        return ()=>{
            isCancel = true 
        }
    },[])
    console.log(addresses);
    return(
        <div className={classes.addressList}> 
            <NavLink to='/account/addresses/newaddress'>address!</NavLink>
            <div className={classes.title}>
                <h1>Addresses</h1>
                <button><NavLink to='/account/addresses/newaddress'>+ Add new address!</NavLink></button>
            </div>
            {addresses.map((address=>(
                <div className={classes.card} key={address.key}>
                    <div className={classes.addressSummary}>
                        {address.default && <div className={classes.addressDefault}>&#9733; Default address</div>}
                        <div className={classes.addressName}>{address.firstName} {address.lastName}</div>
                        <div className={classes.addressStreet}>{address.street} {address.apt}</div>
                        <div className={classes.addressCity}>{address.city}, {address.state} {address.zipCode}</div>
                        <div className={classes.addressPhone}>Phone number: {address.phone}</div>
                    </div>
                    <div className={classes.buttons}>
                       <button className={classes.addressEdit}>Edit</button>
                       <button className={classes.addressRemove}>Remove</button>
                    </div>
                </div>
            )))}
                    
               
        </div>
    )
}
export default AddressList