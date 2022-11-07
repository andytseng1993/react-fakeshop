import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom"
import classes from './CheckoutLayout.module.css'

const CheckoutLayout = ()=>{
    return (
        <>
            <div className={classes.nav}>
                <NavLink to={'/cart'} className={classes.backToCart}>
                    <FontAwesomeIcon icon={faChevronLeft} className={classes.faChevronLeft} />
                    shopping cart
                </NavLink>
                <NavLink to='/' className={classes.home}>
                    <img src={process.env.PUBLIC_URL+'/logo192.png'}></img>
                </NavLink> 
            </div>
            <main>
                <Outlet/>                
            </main>
        </>
    )
}
export default CheckoutLayout