import { useLocation } from "react-router-dom"

const ComfirmedPage = () =>{
    const location = useLocation()
    console.log(location);
    return (
        <div style={{marginTop:100}}>Order Comfirmation</div>
    )
}
export default ComfirmedPage