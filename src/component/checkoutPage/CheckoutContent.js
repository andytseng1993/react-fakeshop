import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import AddressForm from "../address/AddressForm"

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:''}

const CheckoutContent = ()=>{
    const navigation = useNavigate()
    const [address,setAddress] = useState(initialAddress)
    const [checked,setChecked]=useState(false)
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
            <div style={{width:'70%'}}>Shipping address
            {address.firstName && address.street? (<div> Hele</div>)
            :
            <AddressForm {...{address,setAddress,checked,setChecked,handleCancel,handleSave}} />
            }
            </div>
            <div>Payment method</div>
            <div>Place your order</div>
        </div>
    )
}

export default CheckoutContent