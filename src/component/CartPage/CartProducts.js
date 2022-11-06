const CartProducts = ()=>{
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
}
export default CartProducts