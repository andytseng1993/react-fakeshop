import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import CheckoutAddress from "./CheckoutAddress"
import classes from './CheckoutContent.module.css'
import { useUserAuth } from "../../context/UserAuthContext";
import { getDatabase,ref ,onValue, query, orderByChild} from "firebase/database";
import CheckoutComfirmAddress from "./CheckoutComfirmAddress";
import CheckoutCreditCard from "./CheckoutCreditCard";
import BillingAddress from "./BillingAddress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import 'react-credit-cards/es/styles-compiled.css';
import Card from 'react-credit-cards';

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:'',key:''}
const initialBillingAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:''}
const initialCard= {number:'',cvc:'',expiry:'',focus:'',name:'',issuer:''}

const CheckoutContent = ()=>{
    const { currentUser }  = useUserAuth()
    const db = getDatabase()
    const [address,setAddress] = useState(initialAddress)
    const [emailValue,seteEmailValue] =useState('')
    const [card,setCard]= useState(initialCard)
    const [billingAddress,setBillingAddress] = useState(initialBillingAddress)
    const [cardError,setCardError]=useState('')
    const [billingAddressError,setBillingAddressError]=useState('')
    const [editAddress,setEditAddress] = useState(false)
    const [editPayment,setEditPayment] = useState(false)
    const [paymentInfo,setPaymentInfo] = useState(true)
    const [cardNumberPreview,setCardNumberPreview] = useState('')
    useEffect(()=>{
        const preferrAddress = []
        let isCancel = false
        const readAddressData = ()=>{
            if(!currentUser) return
            seteEmailValue(currentUser.email)
            const topUserPostsRef = query(ref(db, 'users/'+currentUser?.uid+'/addresses'), orderByChild('createTime'))
            onValue(topUserPostsRef, (snapshot) => {
                snapshot.forEach((childSnapshot)=> {
                    if(!isCancel){
                        if(childSnapshot.val().default){
                            preferrAddress.push(childSnapshot.val())
                            setAddress(childSnapshot.val())
                            setEditAddress(false)
                            setEditPayment(true)
                        }
                    }
                  })  
            })
        }
        readAddressData()
        return ()=>{
            isCancel = true
        }
        // eslint-disable-next-line
    },[currentUser])

    useEffect(()=>{
       if(card.number.length<4) return
       const numLength = card.number.length-4
       let newNum= card.number.slice(0,numLength).replaceAll(/[0-9]/g,'*')
       setCardNumberPreview(newNum.concat(card.number.slice(-4)))
    },[card.number])

    const handleCancel =(e)=>{
        e.preventDefault()
        setAddress(initialAddress)
        seteEmailValue('')
    }
    const handleSave =()=>{
        setEditAddress(false)
        setEditPayment(true)
    }
    const handleAddressEdit =()=>{
        setEditAddress(true)
    }
    const handleEditPayment =(e)=>{
        e.preventDefault()
        setEditPayment(true)
        setPaymentInfo(false)
    }
    const handlePaymentSubmmit = (e)=>{
        e.preventDefault()
        const {number,cvc,expiry,name} = card
        const {firstName,lastName, street,apt,city,zipCode} = billingAddress
        if(number===''||cvc===''||expiry===''||name==='') return setCardError('Please enter credit or debit card Info.')
        setCardError('')
        if(firstName===''||lastName===''|| street===''||city===''||zipCode==='') return setBillingAddressError('Please enter billing address.')
        setBillingAddressError('')
        setEditPayment(false)
        setPaymentInfo(true)
    }
    return (
        <div className={classes.checkoutContent}>
            <div className={classes.checkoutDetail}>
                <NavLink to={'/cart'} className={classes.backToCart}>
                    <FontAwesomeIcon icon={faChevronLeft} className={classes.faChevronLeft} />
                    shopping cart
                </NavLink>
                <div>Review items</div>
                <div className={`${editAddress?classes.editAddress:classes.shoppingAddress}`}>
                    <div className={`${editAddress?classes.editAddressTitle:classes.shoppingAddressTitle}`}>
                        {editAddress?<p>Choose your shipping address</p>:<p>Shipping address</p>}
                        {!editAddress && <button onClick={handleAddressEdit} >Edit</button>}
                    </div>
                    {editAddress?
                        <CheckoutAddress {...{currentUser,address,setAddress,handleCancel,handleSave,emailValue,seteEmailValue}} />:
                        <CheckoutComfirmAddress {...{address,emailValue}} />}
                </div>
                <div className={`${editPayment?classes.editPayment:classes.shoppingPayment}`}>
                    <div className={`${editPayment?classes.editPaymentTitle:classes.shoppingPaymentTitle}`}>
                        {editPayment?<p>Choose a payment method</p>:<p>Payment Info</p>}
                        {(paymentInfo&&!editPayment) && <button className={classes.paymentEdit} onClick={handleEditPayment} >Edit</button>}
                    </div>
                    <div className={`${classes.checkoutCreditCard} ${editPayment?classes.editCheckoutCreditCard:''}`}>
                        {editPayment?
                            <>
                                {/* <div>promotional code</div> */}
                                <CheckoutCreditCard {...{card,setCard}}/>
                                {cardError && <div className={classes.cardError}>{cardError}</div> }
                                <BillingAddress checkbox={true} {...{address,billingAddress,setBillingAddress}} />
                                {billingAddressError && <div className={classes.cardError}>{billingAddressError}</div> }
                            </>
                            :
                            <>
                            </>
                        }
                        {
                            paymentInfo?
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
                            :
                            <></>
                        }
                    </div>
                    <div style={{display:'flex',justifyContent: 'flex-end' }}>
                       {editPayment && <button className={classes.paymentSubmmit} onClick={handlePaymentSubmmit}>Submit Payment</button>}
                    </div>
                </div>
                <div>Place your order</div>
            </div>
            <div>
                Price
            </div>
        </div>


    )
}

export default CheckoutContent