
import ProductCategory from "../component/shopPage/ProductCategory"
import ProductListing from "../component/shopPage/ProductListing"

function ShopPage(){
    return (
        <>  
            <ProductCategory/>
            <h1 style={{marginTop:'20px'}}>All Products</h1>
            <ProductListing/>
        </>
    )
}

export default ShopPage