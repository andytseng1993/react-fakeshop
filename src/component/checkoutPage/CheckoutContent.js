import { useState } from "react"
import { NavLink } from "react-router-dom"
import CheckoutAddress from "./CheckoutAddress"
import classes from './CheckoutContent.module.css'
import { useUserAuth } from "../../context/UserAuthContext";

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:'',key:''}

const CheckoutContent = ()=>{
    const { currentUser }  = useUserAuth()
    const [address,setAddress] = useState(initialAddress)
    const [emailValue,seteEmailValue] =useState('')
    const [editAddress,setEditAddress] = useState(true)
    console.log(currentUser);
    const handleCancel =(e)=>{
        e.preventDefault()
    }
    const handleSave =()=>{
        setEditAddress(false)
    }
    const handleEdit =()=>{
        setEditAddress(true)
    }
    console.log(address);
    return (
        <div className={classes.checkoutContent}>
            <div className={classes.checkoutDetail}>
                <NavLink to={'/cart'}>back to shopping cart</NavLink>
                <div>Review items</div>
                <div className={`${editAddress?classes.shoppingAddress:classes.editAddress}`}>
                    <div className={`${editAddress?classes.shoppingTitle:classes.editAddressTitle}`}>
                        {editAddress?<p>Choose your shipping address</p>:<p>Shipping address</p>}
                        {!editAddress && <button onClick={handleEdit} >Edit</button>}
                    </div>
                    {editAddress?
                        <CheckoutAddress {...{currentUser,address,setAddress,handleCancel,handleSave,emailValue,seteEmailValue}} />
                        :
                        <div className={classes.addressBox}>
                            <div className={classes.addressSummary}>
                                <div className={classes.addressName}>{address.firstName} {address.lastName}</div>
                                <div className={classes.addressStreet}>{address.street} {address.apt}, {address.city}, {address.state} {address.zipCode}</div>
                                <div style={{height:7}} ></div>
                                <div className={classes.addressStreet}>Email: {emailValue}</div>
                                <div className={classes.addressStreet}>Phone number: {address.phone}</div>
                            </div>
                        </div>
                    }
                    
                </div>
                <div>Payment method</div>
                <div>Place your order</div>
            </div>
            <div>
                Price
            </div>
        </div>


    )
}

export default CheckoutContent