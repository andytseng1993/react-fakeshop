import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import CheckoutAddress from "./CheckoutAddress"
import classes from './CheckoutContent.module.css'
import { useUserAuth } from "../../context/UserAuthContext";
import { getDatabase,ref ,onValue, query, orderByChild} from "firebase/database";
import CheckoutComfirmAddress from "./CheckoutComfirmAddress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import CardInfo from "./CardInfo";
import OrderSummary from "./OrderSummary";

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:'',key:''}
const initialBillingAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:''}
const initialCard= {number:'',cvc:'',expiry:'',focus:'',name:'',issuer:''}

const CheckoutContent = ()=>{
    const { currentUser }  = useUserAuth()
    const db = getDatabase()
    const [address,setAddress] = useState(initialAddress)
    const [emailValue,seteEmailValue] =useState('')
    const [billingAddress,setBillingAddress] = useState(initialBillingAddress)
    const [card,setCard]= useState(initialCard)
    const [editAddress,setEditAddress] = useState(false)
    const [editPayment,setEditPayment] = useState(false)
    const [paymentInfo,setPaymentInfo] = useState(false)
    const [isLoad,setIsLoad] = useState(true)

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
                            setIsLoad(false)
        }}})})}
        readAddressData()
        return ()=>{
            isCancel = true
            setIsLoad(true)
        }
        // eslint-disable-next-line
    },[currentUser])


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

    
    return (
        <div className={classes.checkoutContent}>
            <div className={classes.checkoutDetail}>
                <NavLink to={'/cart'} className={classes.backToCart}>
                    <FontAwesomeIcon icon={faChevronLeft} className={classes.faChevronLeft} />
                    shopping cart
                </NavLink>
                <div className={`${editAddress?classes.editAddress:classes.shoppingAddress}`}>
                    <div className={`${editAddress?classes.editAddressTitle:classes.shoppingAddressTitle}`}>
                        {editAddress?<p>Choose your shipping address</p>:<p>Shipping address</p>}
                        {!editAddress && <button onClick={handleAddressEdit} >Edit</button>}
                    </div>
                    {editAddress?
                        <CheckoutAddress {...{currentUser,address,setAddress,handleCancel,handleSave,emailValue,seteEmailValue,isLoad,setIsLoad}} />:
                        <CheckoutComfirmAddress {...{address,emailValue,isLoad,setIsLoad}} />}
                </div>
                <CardInfo {...{editPayment,setEditPayment,address,billingAddress,setBillingAddress,card,setCard,paymentInfo,setPaymentInfo}} />
            </div>
            <div className={classes.checkoutPrice}>
                <OrderSummary/> 
                <div>123</div>      
            </div>
        </div>


    )
}

export default CheckoutContent