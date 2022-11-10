import { useState } from 'react';
import { Link } from 'react-router-dom'
import classes from './FavoriteItem.module.css'
import { addCartList} from "../../redux/actions"
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import FavoriteBtn  from '../favorite/FavoriteBtn';
import Rating from '../reviews/Rating';
import { useFetchProductIdData, useFetchProductRating } from '../../useFn/UseFetchProductRating';

const FavoriteItem=({productId,favoriteList})=>{
    const dispatch = useDispatch()
    const [addCart,setAddCart] =useState(false)
    const {isLoading, data:productDetail } = useFetchProductIdData(productId)
    const { data:ratingObj,isLoading:ratingIsLoading } = useFetchProductRating(productId)
    
    const addCartHandler =  (product)=>{
        product.id =  nanoid()
        dispatch(addCartList(product))
        setTimeout(()=>setAddCart(true),500)
    }
    if(isLoading||ratingIsLoading) return ( <></> )
    const product = {...productDetail,count: 1,productId}
    return(
        <div className={classes.container}>
            <div className={classes.cards}>
                <Link to={`/product/${productId}`} className={classes.imageLink}>
                    <img src={productDetail.image} alt={productDetail.title}></img>
                </Link>    
                <div className={classes.content}>
                    <div className={classes.header}>
                        <Link to={`/product/${productId}`}>
                            {productDetail.title}
                        </Link> 
                    </div>
                    <div className={classes.rating}>
                        <Link to={`/product/${productId}`}>
                            {ratingObj.rating>0? <Rating rating={ratingObj.rating} reviewsNum={ratingObj.reviewCount} fontSize={15}/>:null}
                        </Link> 
                    </div>
                    <div className={classes.productInfo}>
                        <div className={classes.priceAndCategory}>
                            <div className={classes.price}>$ {productDetail.price}</div>
                            <div className={classes.category}>{productDetail.category}</div>  
                        </div>
                        <FavoriteBtn productId={productId} favoriteList={favoriteList} />    
                    </div>
                    {!addCart?
                        <div className={classes.cart} onClick={()=>addCartHandler(product)}>
                            Add to Cart
                        </div>
                        :
                        <div className={classes.addCart}>
                            <div className={classes.checkContent}>
                                <FontAwesomeIcon icon={faCircleCheck} className={classes.check}/>
                                <p>Added to Cart</p>
                            </div>
                            <Link to={'/cart'} className={classes.viewCart}>View your Cart</Link>     
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FavoriteItem