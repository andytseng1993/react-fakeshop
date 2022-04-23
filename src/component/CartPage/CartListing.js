import { useDispatch, useSelector } from "react-redux"
import classes from './CartListing.module.css'
import { increaseQuantity,decreaseQuantity } from "../../redux/actions"

const CartListing= ()=>{
    const dispatch= useDispatch()
    const cartLists = useSelector((state)=> state.setCartList)
    const itemPrice = cartLists.reduce((pre,cur)=> pre+cur.price*cur.count,0)
    const taxPrice = itemPrice*0.0775
    const shippingPrice = itemPrice>100? 0: 50
    const totalPrice = itemPrice+taxPrice+shippingPrice
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
                        <div className={classes.count}>Qty: 
                            <button onClick={()=>increaseQtyHandler(product.productId)}>+</button>
                            <div className={classes.quantity}>{product.count}</div>
                            <button onClick={()=>decreaseQtyHandler(product.productId)}>-</button>
                        </div>
                        <div>Subtotal: ${itemPrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        )
    })
    if(itemPrice===0){
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
                    <div>$ {itemPrice.toFixed(2)}</div>
                </div>
                <div className={classes.summaryContext}>
                    <div>Tax Price</div>
                    <div>$ {taxPrice.toFixed(2)}</div>
                </div>
                <div className={classes.summaryContext}>
                    <div>Shipping Price</div>
                    <div>{shippingPrice.toFixed(2)==='0.00'? 'Free':'$ '+shippingPrice.toFixed(2)}</div>
                </div>
                <div className={classes.summaryContext}>
                    <div><strong>Total Price</strong></div>
                    <div><strong>$ {totalPrice.toFixed(2)}</strong></div>
                </div>
                <button>Checkout</button>
            </div> 
            
            
        </div>
    )
}

export default CartListing