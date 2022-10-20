import { useState } from "react"
import classes from './PromoCode.module.css'
import AddressInput from "../address/AddressInput"

const PromoCode =({setDiscountRate})=>{
    const [code,setCode] = useState('')
    const [success,setSuccess] = useState('')
    const [error,setError] = useState('')
    const handleChangePromo = (e)=>{
        e.preventDefault()
        setCode(e.target.value)
    }
    const handleApply = ()=>{
        if(code.toUpperCase()==='FAKESTORE'){
            setCode('')
            setError('')
            setDiscountRate(30)
            return setSuccess('Save 30% on checkout.')
        }
        setError('This promoo code is not available')
        setDiscountRate(0)
        setSuccess('')
    }
    return(
        <div className={classes.promo}>
            <div className={classes.promoTitle}>Promotional Code</div>
            <div className={classes.promoInput}>
                <AddressInput title={'Promo Code'} value={code} handleChange={handleChangePromo}/>
                <button onClick={handleApply}>Apply</button>
            </div>
            <span>E.g.:Fakestore</span>
            {success && <div className={classes.success}>{success}</div>}
            {error && <div className={classes.error}>{error}</div>}
        </div>
    )
}
export default PromoCode