import { useEffect, useState } from 'react'
import classes from './CardInfo.module.css'
import Card from 'react-credit-cards';
import CheckoutCreditCard from "./CheckoutCreditCard";
import BillingAddress from "./BillingAddress";
import 'react-credit-cards/es/styles-compiled.css';
import Payment from "payment";
import PromoCode from './PromoCode';

const CardInfo =({editPayment,setEditPayment,address,billingAddress,setBillingAddress,card,setCard,paymentInfo,setPaymentInfo,setDiscountRate})=>{
    const [cardNumberPreview,setCardNumberPreview] = useState('')
    const [cardError,setCardError]=useState('')
    const [billingAddressError,setBillingAddressError]=useState('')

    useEffect(()=>{
        if(card.number.length<4) return
        const numLength = card.number.length-4
        let newNum= card.number.slice(0,numLength).replaceAll(/[0-9]/g,'*')
        setCardNumberPreview(newNum.concat(card.number.slice(-4)))
     },[card.number])

    const handleEditPayment =(e)=>{
        e.preventDefault()
        setEditPayment(true)
        setPaymentInfo(false)
    }
     const handlePaymentSubmmit = (e)=>{
        e.preventDefault()
        const {number,cvc,expiry,name,issuer} = card
        const {firstName,lastName, street,city,zipCode} = billingAddress
        if(number.length<16||cvc===''||expiry===''||name==='') return setCardError('Please enter credit or debit card Info.')
        if(!Payment.fns.validateCardNumber(number)) return setCardError('Please enter a valid card number.')
        if(!Payment.fns.validateCardExpiry(expiry)) return setCardError('Please enter a valid card expiry.')
        if(!Payment.fns.validateCardCVC(cvc, issuer)) return setCardError('Please enter a valid card CVC.')
        setCardError('')
        if(firstName===''||lastName===''|| street===''||city===''||zipCode==='') return setBillingAddressError('Please enter billing address.')
        setBillingAddressError('')
        setEditPayment(false)
        setPaymentInfo(true)
    }
    
    return(
        <div className={`${editPayment?classes.editPayment:classes.shoppingPayment}`}>
                    <div className={`${editPayment?classes.editPaymentTitle:classes.shoppingPaymentTitle}`}>
                        {editPayment?<p>Choose a payment method</p>:<p>Payment Info</p>}
                        {(paymentInfo&&!editPayment) && <button className={classes.paymentEdit} onClick={handleEditPayment} >Edit</button>}
                    </div>
                    <div className={`${classes.checkoutCreditCard} ${editPayment?classes.editCheckoutCreditCard:''}`}>
                        {editPayment?
                            <>
                                <PromoCode {...{setDiscountRate}} />
                                <CheckoutCreditCard {...{card,setCard}}/>
                                {cardError && <div className={classes.cardError}>{cardError}</div> }
                                <BillingAddress checkbox={true} {...{address,billingAddress,setBillingAddress}} />
                                {billingAddressError && <div className={classes.cardError}>{billingAddressError}</div> }
                            </>
                            :<></>}
                        {paymentInfo?
                            <div className={classes.paymentInfo}>
                                <Card name={card.name} number={cardNumberPreview} expiry={card.expiry} 
                                    cvc={card.cvc}  preview={true} issuer={card.issuer}
                                />
                                <div className={classes.billingAddress}>
                                    <div className={classes.billing}>Billing Address:</div>
                                    <div className={classes.addressName}>{billingAddress.firstName} {billingAddress.lastName}</div>
                                    <div className={classes.addressStreet}>{billingAddress.street} {billingAddress.apt}</div>
                                    <div className={classes.addressStreet}>{billingAddress.city}, {address.state} {billingAddress.zipCode}</div>
                                </div>
                            </div>
                            :<></>}
                    </div>
                    <div style={{display:'flex',justifyContent: 'flex-end' }}>
                       {editPayment && <button className={classes.paymentSubmmit} onClick={handlePaymentSubmmit}>Submit Payment</button>}
                    </div>
                </div>
    )
}
export default CardInfo