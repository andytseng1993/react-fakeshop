import LogIn from "../logIn/LogIn"
import Navigation from "./Navigation"

function Layout(props){
    return(
        <>
            <Navigation/>
            <main>
                {props.children}
            </main>
            <LogIn/>
        </>
    )
}

export default Layout