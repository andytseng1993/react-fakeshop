import { NavLink } from "react-router-dom"

function Navigation(){
    return(
        <header>
            <div className="logo">
                <NavLink to='/'>
                    FakeStore
                </NavLink>
            </div>
            <nav>
                <NavLink to='/'>
                    Home Page
                </NavLink>
                <NavLink to='store'>
                    Store Page
                </NavLink>
            </nav>
        </header>
    )
}

export default Navigation