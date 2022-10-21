import { useDispatch, useSelector } from "react-redux"
import classes from './CartListing.module.css'
import { increaseQuantity,decreaseQuantity } from "../../redux/actions"
import { useUserAuth } from '../../context/UserAuthContext'
import { useEffect, useState } from "react"
import LoginCheck from "./LoginCheck"
import { useNavigate } from "react-router-dom"

const CartListing= ()=>{
    const dispatch= useDispatch()
    const cartLists = useSelector((state)=> state.setCartList)
    const [itemPrice,setItemPrice] = useState(null)
    const [totalPrice,setTotalPrice] = useState(null)
    const [shipping,setShipping] = useState(0)
    const {currentUser}=useUserAuth()
    const [loginCheck,setLoginCheck]= useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const items = cartLists.reduce((pre,cur)=> pre+cur.price*cur.count,0)
        const shippingPrice = items >= 150? 0:50
        setItemPrice(price(items))
        setShipping(price(shippingPrice))
        setTotalPrice(price([items,shippingPrice].reduce((pre,cur)=>pre+cur,0)))
    },[cartLists])
    
    const increaseQtyHandler=(productId)=>{
        dispatch(increaseQuantity(productId))
    } 
    const decreaseQtyHandler=(productId)=>{
        dispatch(decreaseQuantity(productId))
    } 

    const list = cartLists.map(product => { 
        const itemPrice = product.price*product.count
        return (
            <div key={product.id} className={classes.cartContent}>
                <div className={classes.card}>
                    <div className={classes.image}>
                        <img src={product.image} alt={product.title}></img>
                    </div>
                    <div className={classes.cartInfo}>
                        <div className={classes.title}>{product.title}</div>
                        <div className={classes.category}>{product.category}</div>
                        <div className={classes.price}>${product.price}</div>
                        <div className={classes.count}> 
                            <button className={classes.countBtn} onClick={()=>decreaseQtyHandler(product.productId)}>-</button>
                            <div className={classes.quantity}>{product.count}</div>
                            <button className={classes.countBtn} onClick={()=>increaseQtyHandler(product.productId)}>+</button>
                        </div>
                        <div className={classes.subtotal}>Subtotal: ${itemPrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        )
    })
    const handleCheckout = (e)=>{
        e.preventDefault()
        if(!currentUser){
            return setLoginCheck(true)
        }
        navigate('/checkout')
    }
    const price = (price)=>{
        if(price===0) return 0
        if(!price) return null
        return Math.round(price*100)/100
    }

    if(cartLists.length===0){
        return (
            <h2>There are no items in your bag!</h2>
        )
    }
    return (
        <div className={classes.shoppinglayout}>
            <div className={classes.shoppingOrder}>
               {list}
            </div>
            <div className={classes.shoppingSummary}>
                <div className={classes.summaryContext}>
                    <div>Items Price</div>
                    <div>$ {price(itemPrice)}</div>
                </div>
                <div className={classes.summaryContext}>
                    <div>Estimated Tax</div>
                    <div>--</div>
                </div>
                <div className={classes.shippingContext}>
                    <div>Shipping</div>
                    <div>{shipping?'$':''}{shipping===0?'Free':shipping.toFixed(2)||'--'}</div>
                </div>
                {!shipping?
                    <div className={classes.shippingDiscount}>
                        <div className={classes.shippingPromo}>Free shipping on orders of $150+ </div>
                    </div>:
                    <div className={classes.noneShippingDiscount}>
                        <div className={classes.shippingPromo}>Spend ${price(150-itemPrice)} more to unlock free shipping. </div>
                    </div>
                }
                <div className={classes.totalPriceContext}>
                    <div><strong>Total Price</strong></div>
                    <div><strong>$ {price(totalPrice)}</strong></div>
                </div>
                <button onClick={handleCheckout}>Checkout</button>
            </div> 
            {loginCheck && <LoginCheck {...{setLoginCheck}} />} 
            
        </div>
    )
}

export default CartListing