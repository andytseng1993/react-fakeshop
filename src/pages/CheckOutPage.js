import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import CheckoutContent from "../component/checkoutPage/CheckoutContent"

const CheckOutPage = ()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const {checkoutId} = useParams()
    
    useEffect(() => {
        if(!location || location.state?.id!==checkoutId) return navigate('/',{replace: true})
         // eslint-disable-next-line
    }, [])
    
    return (
        <div style={{marginTop:50}}>
            <CheckoutContent/>
        </div>
    )
}

export default CheckOutPage