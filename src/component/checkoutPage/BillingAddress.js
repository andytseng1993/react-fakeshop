import { useEffect, useState } from 'react'
import AddressForm from '../address/AddressForm'
import classes from './BillingAddress.module.css'

const initialBillingAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:''}

const BillingAddress =({address,billingAddress,setBillingAddress})=>{
    const [isChecked,setIsChecked] = useState(true)
    const [comfirmed,setComfirmed] = useState(true)
    const [billingAddressInput,setBillingAddressInput] = useState(initialBillingAddress)
    useEffect(()=>{
        setBillingAddress(address)
    },[])
    const handleCheckBox =()=>{
        if(isChecked){
            setBillingAddress(initialBillingAddress)
            setComfirmed(false)
        }else{
            setBillingAddress(address)
            setComfirmed(true)
        }
        setIsChecked(()=>!isChecked)
    }
    const addNewAddressSave=(e)=>{
        e.preventDefault()
        setBillingAddress(billingAddressInput)
        setComfirmed(true)
    }
    const closeHandler=(e)=>{
        e.preventDefault()
        setBillingAddressInput(initialBillingAddress)
    }
    const handleEdit =(e)=>{
        e.preventDefault()
        setComfirmed(false)
    }
    
    return(
        <div className={classes.billingAddressArea}>
            <div className={classes.creditCardTitle}>Billing Address</div>  
            <label className={`${isChecked?classes.creditCardCheckbox:classes.notCheck}`}>
                <input className={classes.creditCardCheckboxInput} type='checkbox' value={isChecked} checked={isChecked} onChange={handleCheckBox} />Use Shipping address as billing address
            </label>
            {comfirmed && 
                <div className={classes.billingAddress}>
                    {!isChecked && <button onClick={handleEdit} className={classes.edit} >Edit</button>}
                    <div className={classes.addressName}>{billingAddress.firstName} {billingAddress.lastName}</div>
                    <div className={classes.addressStreet}>{billingAddress.street} {billingAddress.apt}, {billingAddress.city}, {address.state} {billingAddress.zipCode}</div>
                </div>
            }
            {!comfirmed &&
                <AddressForm phoneInput='false' leftBtnName='Clear' rightBtnName='Use this Address' address={billingAddressInput} setAddress={setBillingAddressInput}
                    defaultAddress='false' handleCancel={closeHandler} handleSave={addNewAddressSave} />
            }
        </div>
    )
}
export default BillingAddress