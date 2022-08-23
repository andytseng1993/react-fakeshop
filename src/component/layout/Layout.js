import LogIn from "../logIn/LogIn"
import Register from "../logIn/Register"
import Navigation from "./Navigation"

function Layout(props){
    function scroll(){
        props.scroll()
    }
    return(
        <>
            <Navigation scroll={scroll}/>
            <main>
                {props.children}
            </main>
            <LogIn/>
            <Register/>
        </>
    )
}

export default Layout