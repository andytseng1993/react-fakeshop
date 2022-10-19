import classes from './OrderSummary.module.css'
const OrderSummary = ()=>{
    return (
        <div className={classes.orderContent}>
            <button className={classes.placeOrder} disabled >Place your order</button>
            <h3 className={classes.orderSummaryTitle}>Order Summary</h3>
            <div className={classes.orderSummary}>
                <div className={classes.price}>Items:
                    <span>$</span>
                </div>
                <div className={classes.price}>Discount:
                    <span>$</span>
                </div>
                <div className={classes.price}>Shipping:
                    <span>$</span>
                </div>
                <div className={classes.price}>Estimated Tax:
                    <span>$</span>
                </div>
                <div className={classes.total}>Order total:
                    <span>$</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary