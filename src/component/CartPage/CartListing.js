import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classes from './CartListing.module.css'
import { increaseQuantity,decreaseQuantity } from "../../redux/actions"

const CartLsting= ()=>{
    const [cart,setCart]=useState({})
    const dispatch= useDispatch()
    const cartLists = useSelector((state)=> state.setCartList)
    let sum = 0
    const increaseQtyHandler=(productId)=>{
        dispatch(increaseQuantity(productId))
    } 
    const decreaseQtyHandler=(productId)=>{
        dispatch(decreaseQuantity(productId))
    } 
    const list = cartLists.map(product => { 

        sum += product.price*product.count
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
                            <div>{product.count}</div>
                            <button onClick={()=>decreaseQtyHandler(product.productId)}>-</button>
                        </div>
                        <div>Subtotal: ${product.price*product.count}</div>
                    </div>
                </div>
            </div>
        )
    })
    if(sum===0){
        return (
            <h1>There is empty!</h1>
        )
    }
    return (
        <section>
            {list}
            sum:{sum}
        </section>
    )
}

export default CartLsting