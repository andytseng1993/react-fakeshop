import { useState, useEffect } from 'react'
import classes from './CheckoutReminder.module.css'
const CheckoutReminder=({editAddress,editPayment,paymentInfo})=>{
    const [text,setText] = useState('')
    useEffect(() => {
      if(editAddress) return setText('Please choose your Address and click \'Use this Address\'.')
      if(editPayment) return setText('Please write your Paymentand click \'Submit Payment\'.')
      setText('')
    }, [editAddress,editPayment,paymentInfo])
    
    return(
        <div  className={classes.box}>
            {text}
        </div>
    )
}
export default CheckoutReminder