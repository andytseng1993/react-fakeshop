import { NavLink } from 'react-router-dom'
import classes from './Comfirmation.module.css'
const Comfirmation = ({orderNumber,orderDate})=>{
    return (
        <div className={classes.comfirmation}>
            <div className={classes.title}>Thank You!</div>
            <div className={classes.content}>Thank your for testing this Demo FakeStore!</div>
            <div className={classes.content}>Your order has been palced and being processed.</div>
            <div className={classes.summary}>
                <div className={classes.summaryContent}>Your order number : <strong>{orderNumber}</strong></div>
                <div className={classes.summaryContent}>Order Date : <strong>{orderDate}</strong></div>
            </div>
            <NavLink className={classes.link} to={'/'}>Back to homepage</NavLink>
        </div>
    )
}
export default Comfirmation