import ProductComponent  from "../component/shopPage/ProductComponent"
import  ProductDetail  from "../component/shopPage/ProductDetail"
import ProductListing from "../component/shopPage/ProductListing"

function ShopPage(){
    return (
        <>
            <ProductComponent/>
            <ProductDetail/>
            <ProductListing/>
        </>
    )
}

export default ShopPage