import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Comfirmation from "../component/checkoutComfirmation/Comfirmation"

const ComfirmedPage = () =>{
    const location = useLocation()
    const navigate = useNavigate()
    const [orderNumber,setOrderNumber]= useState('')
    const [orderDate,setOrderDate]= useState('')
    useEffect(() => {
        if(!location.state?.id) return navigate('/',{replace: true})
        setOrderNumber(location.state?.id)
        setOrderDate(location.state?.date)
    }, [])
    
    console.log(location);
    return (
        <div style={{marginTop:100}}>
            <Comfirmation {...{orderNumber,orderDate}} />
        </div>
    )
}
export default ComfirmedPage