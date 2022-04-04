import { useSelector } from "react-redux"

const ProductListing=()=>{
    const products = useSelector((state)=>state)
    console.log(products);
    return (
        <h1>ProductListing</h1>
    )
}
export default ProductListing