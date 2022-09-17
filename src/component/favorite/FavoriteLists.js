import classes from './FavoritLists.module.css'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductComponent from "../shopPage/ProductComponent"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";

const FavoritLists = ()=>{
    const favoriteList = useSelector((state)=>state.favorites)
    const allProducts = useSelector((state)=>state.allProducts.products)
    const [favoriteData,setFavoriteData] = useState([])
    useEffect(()=>{
        function filterItems(arr1, arr2) {
            const data= arr1.filter((el) => arr2.includes(el.id));
            setFavoriteData(data);
        }
        filterItems(allProducts, favoriteList)
    },[allProducts,favoriteList])
    console.log(favoriteData);
    const emptyFavorite = (
        <div className={classes.emptyFavorite} >
            <FontAwesomeIcon icon={fasFaHeart} className={classes.emptyLove}/>
            <h1>Show some love!</h1>
            <p className={classes.emptyLovePar}>You can add items individually or save items while you shop.</p>
        </div>
    )

    return(
        <>
            <div className={classes.favoriteTiltle}>
                    <FontAwesomeIcon icon={fasFaHeart} className={classes.love}/>
                    <h3>Favorites</h3>
                </div>

            {favoriteData.length===0?
                emptyFavorite
                :
                (<div className='productList'>
                {favoriteData.map((product)=>(
                    <ProductComponent key={product.id} product={product} favoriteList={favoriteList} />
                ))}
                </div>)
            }
        </>
    )
}
export default FavoritLists