
import MvArea from "../component/homePage/MvArea";
import ProductListing from "../component/shopPage/ProductListing";

function HomePage(props){
    return(
    <>
        <MvArea/>
        <h1 style={{textAlign:'start',
                    margin:'20px 10% 30px',
                    padding:'30px 0px 10px',
                    borderBottom:'1px solid #777'}}
            ref={props.refProp}
        >
            Product
        </h1>
        <ProductListing />
    </>
    )
}

export default HomePage;