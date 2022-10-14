import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import CheckoutAddress from "./CheckoutAddress"
import classes from './CheckoutContent.module.css'
import { useUserAuth } from "../../context/UserAuthContext";
import { getDatabase,ref ,onValue, query, orderByChild} from "firebase/database";
import CheckoutComfirmAddress from "./CheckoutComfirmAddress";
import CheckoutCreditCard from "./CheckoutCreditCard";
import BillingAddress from "./BillingAddress";

const initialAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:'',phone:'',key:''}
const initialBillingAddress ={firstName:'',lastName:'', street:'',apt:'',city:'',state:'State',zipCode:''}
const CheckoutContent = ()=>{
    const { currentUser }  = useUserAuth()
    const [address,setAddress] = useState(initialAddress)
    const [emailValue,seteEmailValue] =useState('')
    const [editAddress,setEditAddress] = useState(true)
    const [editPayment,setEditPayment] = useState(false)
    const [card,setCard]= useState({number:'',cvc:'',expiry:'',focus:'',name:'',issuer:''})
    const db = getDatabase()
    const [billingAddress,setBillingAddress] = useState(initialBillingAddress)
    
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
    const handleEdit =()=>{

    }
    return (
        <div className={classes.checkoutContent}>
            <div className={classes.checkoutDetail}>
                <NavLink to={'/cart'}>back to shopping cart</NavLink>
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
                        {editPayment?<p>Choose a payment method</p>:<p>Payment method</p>}
                        {!editPayment && <button onClick={handleEdit} >Edit</button>}
                    </div>
                    {editPayment?
                        <div className={classes.checkoutCreditCard}>
                            <div>promotional code</div>
                            <CheckoutCreditCard {...{card,setCard}} />
                            <BillingAddress {...{address,billingAddress,setBillingAddress}} />
                        </div>
                        :
                        <div></div>
                    }
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