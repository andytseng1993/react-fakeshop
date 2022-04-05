import { NavLink } from "react-router-dom"
import classes from './Navigation.module.css'

function Navigation(){
    return(
        <header className={classes.header}>
            <div className={classes.logo}>
                <NavLink to='/'>
                    FakeStore
                </NavLink>
            </div>
            <nav>
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink to='shop'>
                    Shop
                </NavLink>
            </nav>
        </header>
    )
}

export default Navigation