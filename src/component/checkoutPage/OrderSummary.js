
import { useEffect, useState } from 'react'
import classes from './OrderSummary.module.css'


const OrderSummary = ({itemPrice,address})=>{
    const [tax,setTax] = useState(null)
    const [shipping,setShipping] = useState(null)
    const [total,setTotal] = useState(null)
    const num = 0
    useEffect(()=>{
        if(address.state==='State') return
        setTax(price(TAX[address.state].rate*itemPrice))
    },[address.state])

    useEffect(()=>{
        const orderTotal = [tax,itemPrice,shipping].reduce((pre,cur)=>pre+cur,0)
        setTotal(price(orderTotal))
    },[tax,shipping,itemPrice])

    const price = (price)=>{
        if(!price) return null
        return Math.round(price*100)/100
    }
    return (
        <div className={classes.orderContent}>
            <button className={classes.placeOrder} disabled >Place your order</button>
            <h3 className={classes.orderSummaryTitle}>Order Summary</h3>
            <div className={classes.orderSummary}>
                <div className={classes.price}>Items:
                    <span>${price(itemPrice)}</span>
                </div>
                <div className={classes.price}>Discount:
                    <span>{num?'$':''}{num||'--'}</span>
                </div>
                <div className={classes.price}>Shipping:
                    <span>{num?'$':''}{num===0?'Free':num||'--'}</span>
                </div>
                <div className={classes.price}>Estimated Tax:
                    <span>{tax?'$':''}{tax||'--'}</span>
                </div>
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