import { useRef } from "react";
import MvArea from "../component/homePage/MvArea";
import ProductListing from "../component/shopPage/ProductListing";

function HomePage(){
    const  product= useRef()
    return(
    <>
        <MvArea/>
        <h1 style={{textAlign:'start',
                    margin:'20px 10% 30px',
                    paddingBottom:'10px',
                    borderBottom:'1px solid #777'}}
            ref={product}
        >
            Product
        </h1>
        <ProductListing />
    </>
    )
}

export default HomePage;