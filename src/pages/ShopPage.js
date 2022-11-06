
import ProductListing from "../component/shopPage/ProductListing"
import { useUserAuth } from "../context/UserAuthContext"

function ShopPage(){
    const {currentUser}  = useUserAuth()
    return (
        <>  
            <ProductListing {...{currentUser}}/>
        </>
    )
}

export default ShopPage