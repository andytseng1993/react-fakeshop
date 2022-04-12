import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classes from './CartListing.moudule.css'

const CartLsting= ()=>{
    const [cart,setCart]=useState({})
    const dispatch= useDispatch()
    const cartLists = useSelector((state)=> state.setCartList)
    let sum = 0

    const list = cartLists.map(product => { 
        sum += product.price*product.count
        return (
            <div key={product.id} className={classes.cartContent}>
                <div>
                    <img src={product.image} alt={product.title}></img>
                </div>
                <div>
                    <div>{product.title}</div>
                    <div>${product.price}</div>
                    <div>{product.count}</div>
                    <div>Subtotal: ${product.price*product.count}</div>
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