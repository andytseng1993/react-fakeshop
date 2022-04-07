import LogIn from "../logIn/LogIn"
import Register from "../logIn/Register"
import Navigation from "./Navigation"

function Layout(props){
    return(
        <>
            <Navigation/>
            <main>
                {props.children}
            </main>
            <LogIn/>
            <Register/>
        </>
    )
}

export default Layout