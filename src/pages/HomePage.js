
import MvArea from "../component/homePage/MvArea";
import ShopPage from "./ShopPage";

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
        <ShopPage />
    </>
    )
}

export default HomePage;