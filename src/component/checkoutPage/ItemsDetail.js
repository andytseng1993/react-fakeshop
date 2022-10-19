import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './ItemsDetail.module.css'


const ItemsDetail= ({setItemPrice})=>{
    const [totalItems,setTotalItems] = useState(0)
    const cartLists = useSelector((state)=> state.setCartList)

    useEffect(()=>{
        const totalPrice = cartLists.reduce((pre,cur)=> pre+cur.price*cur.count,0)
        const totalICount = cartLists.reduce((pre,cur)=> pre+cur.count,0)
        setItemPrice(totalPrice)
        setTotalItems(totalICount)
    },[cartLists])
    
    return (
        <div className={classes.cart}>
            <div className={classes.cartTitle}>
                <h3>Shopping Cart</h3>
                {/* <button>Detail</button> */}
                <div>{totalItems>1?totalItems+' items': '1 item'}</div>
            </div>
            <div className={classes.items}>
                {cartLists.map((item)=>(
                    <div className={classes.item} key={item.id}>
                        <img src={item.image} alt="image"></img>
                        <div className={classes.itemCount}>{item.count}</div>
                        <div className={classes.itemPrice}>${item.count*item.price}</div>
                    </div>))}   
            </div>
        </div>
    )
}
export default ItemsDetail