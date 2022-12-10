import { useState } from "react"
import classes from './PromoCode.module.css'
import AddressInput from "../address/AddressInput"

const PromoCode =({setDiscountRate,setPromoCode,promoCodeTitle,setPromoCodeTitle})=>{
    const [code,setCode] = useState('')
    const [error,setError] = useState('')
    const handleChangePromo = (e)=>{
        e.preventDefault()
        setCode(e.target.value)
    }
    const handleApply = ()=>{
        if(code==='') return
        if(code.toUpperCase()==='FAKESTORE'){
            setPromoCode('FAKESTORE')
            setError('')
            setDiscountRate(30)
            return setPromoCodeTitle('Save 30% on checkout.')
        }
        setError('This promoo code is not available')
        setPromoCode('')
        setDiscountRate(0)
        setPromoCodeTitle('')
    }
    return(
        <div className={classes.promo}>
            <div className={classes.promoTitle}>Promotional Code</div>
            <div className={classes.promoInput}>
                <AddressInput title={'Promo Code'} value={code} handleChange={handleChangePromo}/>
                <button onClick={handleApply}>Apply</button>
            </div>
            <span>E.g.:Fakestore</span>
            {promoCodeTitle && <div className={classes.success}>{promoCodeTitle}</div>}
            {error && <div className={classes.error}>{error}</div>}
        </div>
    )
}
export default PromoCode