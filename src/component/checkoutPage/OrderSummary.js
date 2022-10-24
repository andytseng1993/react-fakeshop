
import { useEffect, useState } from 'react'
import CheckoutReminder from './CheckoutReminder'
import classes from './OrderSummary.module.css'


const OrderSummary = ({itemPrice,address,discountRate,editAddress,editPayment,paymentInfo,handleCheckout})=>{
    const [tax,setTax] = useState(null)
    const [shipping,setShipping] = useState(0)
    const [total,setTotal] = useState(null)
    const [discount,setDiscount] = useState(null)
    const [disabled,setDisabled] = useState(true)
    useEffect(()=>{
        if(address.state!=='State') setTax(price(TAX[address.state].rate*(itemPrice-discount)))
        if(discountRate!== 0) setDiscount(price(itemPrice*discountRate/100))
        else setDiscount(0)
    },[address.state,discountRate,discount])

    useEffect(()=>{
        const shippingPrice = itemPrice>=150? 0:50
        const orderTotal = [tax,itemPrice,shippingPrice].reduce((pre,cur)=>pre+cur,0)
        setShipping(shippingPrice)
        setTotal(price(orderTotal-discount))
    },[tax,shipping,itemPrice])

    useEffect(()=>{
        if(!editAddress && !editPayment && paymentInfo) return setDisabled(false)
        setDisabled(true)
    },[editAddress,editPayment,paymentInfo])
    const price = (price)=>{
        if(price===0) return 0
        if(!price) return null
        return Math.round(price*100)/100
    }

    return (
        <div className={classes.orderContent}>
            <div style={{position: 'relative'}}>
                <button className={`${classes.placeOrder} ${!disabled?classes.ablePlaceOrder:''}`} disabled={disabled} onClick={handleCheckout} >Place your order</button>
                {!(!editAddress&&!editPayment&&paymentInfo) && <CheckoutReminder {...{editAddress,editPayment,paymentInfo}} />}
            </div>
            <h3 className={classes.orderSummaryTitle}>Order Summary</h3>
            <div className={classes.orderSummary}>
                <div className={classes.price}>Items:
                    <span>${price(itemPrice)}</span>
                </div>
                <div className={classes.price}>Discount:
                    <span>{discount?'-$':''}{discount||'--'}</span>
                </div>
                <div className={classes.price}>Estimated Tax:
                    <span>{tax!==null?'$':''}{tax??'--'}</span>
                </div>
                <div className={classes.shipping}>Shipping:
                    <span>{shipping?'$':''}{shipping===0?'Free':shipping.toFixed(2)||'--'}</span>
                </div>
                {!shipping?
                    <div className={classes.shippingDiscount}>
                        <div className={classes.shippingPromo}>Free shipping on orders of $150+ </div>
                    </div>:
                    <div className={classes.noneShippingDiscount}>
                        <div className={classes.shippingPromo}>Spend ${price(150-itemPrice)} more to unlock free shipping. </div>
                    </div>
                }
                
                <div className={classes.total}>Order total:
                    <span>${total}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary

/* Avg.Sales Tax Rates as of July 1, 2022 */ 
const TAX = {
    'AR':{
        'rate':0.0947
    },
    "AK": {
        "rate": 0.0176,
    },
    'AS':{
        'rate':0.15
    },
    'DE':{
        'rate':0.00
    },
    "HI": {
        "rate": 0.0444,
    },
    "MA": {
        "rate": 0.0625
    },
    "RI": {
        "rate": 0.07,
    },
    "CT": {
        "rate": 0.0635,
    },
    "NJ": {
        "rate": 0.066,
    },
    "MD": {
        "rate": 0.06
    },
    "DC": {
        "rate": 0.06
    },
    "WA": {
        "rate": 0.0929,
    },
    "CA": {
        "rate": 0.0882,
    },
    "NV": {
        "rate": 0.0823
    },
    "NH": {
        "rate": 0.00
    },
    "ID": {
        "rate": 0.0602,
    },
    "WY": {
        "rate": 0.0536,
    },
    "UT": {
        "rate": 0.0719,
    },
    "AZ": {
        "rate": 0.066,
    },
    "CO": {
        "rate": 0.0777,
    },
    "NM": {
        "rate": 0.0772
    },
    "ND": {
        "rate": 0.0696,
    },
    "SD": {
        "rate": 0.064,
    },
    "NE": {
        "rate": 0.0694
    },
    "KS": {
        "rate": 0.0871,
    },
    "OK": {
        "rate": 0.0899,
    },
    "OR": {
        "rate": 0.00,
    },
    "TX": {
        "rate": 0.082,
    },
    "MN": {
        "rate": 0.0749
    },
    "IA": {
        "rate": 0.0694,
    },
    "MO": {
        "rate": 0.083
    },
    "MT": {
        "rate": 0.00
    },
    "AR": {
        "rate": 0.06,
    },
    "LA": {
        "rate": 0.0955,
    },
    "WI": {
        "rate": 0.0543,
    },
    "IL": {
        "rate": 0.0873,
    },
    "MI": {
        "rate": 0.06
    },
    "IN": {
        "rate": 0.07,
    },
    "OH": {
        "rate": 0.0724
    },
    "KY": {
        "rate": 0.06,
    },
    "TN": {
        "rate": 0.0955,
    },
    "MS": {
        "rate": 0.0707,
    },
    "AL": {
        "rate": 0.0924,
    },
    "GA": {
        "rate": 0.0737
    },
    "GU": {
        "rate": 0.02
    },
    "FL": {
        "rate": 0.0701,
    },
    "ME": {
        "rate": 0.055,
    },
    "VT": {
        "rate": 0.0624,
    },
    "NY": {
        "rate": 0.0852,
    },
    "PA": {
        "rate": 0.0634,
    },
    "PR": {
        "rate": 0.105,
    },
    "WV": {
        "rate": 0.0655
    },
    "VA": {
        "rate": 0.0575
    },
    "VA": {
        "rate": 0.04
    },
    "NC": {
        "rate": 0.0698
    },
    "SC": {
        "rate": 0.0744
    }
}