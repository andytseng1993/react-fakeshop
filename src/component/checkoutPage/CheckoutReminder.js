import { useState, useEffect } from 'react'
import classes from './CheckoutReminder.module.css'
const CheckoutReminder=({editAddress,editPayment,paymentInfo})=>{
    const [text,setText] = useState('')
    useEffect(() => {
      if(editAddress) return setText('Please click \'Use this Address\' to choose your Address.')
      if(editPayment) return setText('Please click \'Submit Payment\' to choose your Payment.')
      setText('')
    }, [editAddress,editPayment,paymentInfo])
    
    return(
        <div  className={classes.box}>
            {text}
        </div>
    )
}
export default CheckoutReminder