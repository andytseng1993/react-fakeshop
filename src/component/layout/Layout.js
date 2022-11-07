import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { updateCartList } from "../../redux/actions"
import LogIn from "../logIn/LogIn"
import Register from "../logIn/Register"
import Navigation from "./Navigation"

function Layout(props){
    const dispatch = useDispatch()
    useEffect(() => {
        let isCancel = false
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if(!cartItems) return
        if(cartItems.length!==0 && !isCancel){
            dispatch(updateCartList(cartItems))
        }
        return ()=>{
            isCancel = true
        }
    }, [dispatch])
    
    function scroll(){
        props.scroll()
    }
    return(
        <>
            <Navigation scroll={scroll}/>
            <main>
                <Outlet/>                
            </main>
            <LogIn/>
            <Register/>
        </>
    )
}

export default Layout