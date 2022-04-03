
import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"

function Layout(props){
    return(
        <>
            <Navigation/>
            <main>
                <Outlet/>
                {props.children}
            </main>
        </>
    )
}

export default Layout