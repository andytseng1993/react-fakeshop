import { Link } from 'react-router-dom'
import { useFetchProductIdData, useFetchProductRating } from '../../useFn/UseFetchProductRating'
import classes from './AccountFavorite.module.css'

const AccountFavorite = ({productId})=>{
    const {isLoading, data:productDetail } = useFetchProductIdData(productId)
    // eslint-disable-next-line
    const { data:ratingObj,isLoading:ratingIsLoading } = useFetchProductRating(productId)

    if(isLoading||ratingIsLoading) return ( <></> )
    return (
        <Link to={`/product/${productId}`} className={classes.favoritesCard}>
            <div className={classes.image}>
                <img src={productDetail.image} alt={productDetail.title}></img>
            </div>
            <div className={classes.cartInfo}>
                <div className={classes.title}>{productDetail.title}</div>
                <div className={classes.category}>
                    {productDetail.category}
                    <div className={classes.price}>${productDetail.price}</div>
                </div>
            </div>
        </Link>
    )
}

export default AccountFavorite