import { useState } from "react"
import { NavLink } from "react-router-dom"
import CheckoutAddress from "./CheckoutAddress"
import classes from './CheckoutContent.module.css'

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:'',key:''}

const CheckoutContent = ()=>{
    const [address,setAddress] = useState(initialAddress)
    const handleCancel =(e)=>{
        e.preventDefault()
    }
    const handleSave =(e)=>{
        e.preventDefault()
        
    }
    return (
        <div>
            <NavLink to={'/cart'}>back to shopping cart</NavLink>
            <div>Review items</div>
            <div style={{width:'70%'}}>Choose your Shipping address
            <CheckoutAddress {...{address,setAddress,handleCancel,handleSave}} />
            </div>
            <div>Payment method</div>
            <div>Place your order</div>
        </div>
    )
}

export default CheckoutContent