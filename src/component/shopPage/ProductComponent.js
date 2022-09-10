import {useState} from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductComponent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";

const test =[{id:1,time:'12315'},{id:10,time:'8657643'}]

const ProductComponent=({productCategory,allProducts})=>{
    const [favorite,setFavorite] = useState(test)
    let products
    if(productCategory!== ''){
        products= allProducts.filter(({category})=> category===productCategory)
    }
    if(productCategory=== 'All Products'){
        products= allProducts
    }
    const favorites= (productId) =>{
        const favoriteProduct=favorite.map(product=>product.id)
        return favoriteProduct.includes(productId)
    }
    
    const handleAddFavorite = (productId)=>{
        setFavorite(pre=>[...pre,{id:productId,time:Date.now()}])
    }
    console.log(favorite);
    const handleRemoveFavorite = (productId)=>{
        setFavorite(favorite.filter(item=>item.id !== productId))
    }
    const renderList = products.map((product)=>{
        const {id,title,image,price,category} = product
        return(
            <div className={classes.container} key={id}>
                    <div className={classes.cards}>
                        <Link to={`/product/${id}`}>
                            <div className={classes.image}>
                                <img src={image} alt={title}></img>
                            </div>
                        </Link>    
                        <div className={classes.content}>
                            <div className={classes.header}>
                                <Link to={`/product/${id}`}>
                                    {title}
                                </Link> 
                            </div>
                            <div className={classes.productInfo}>
                                <div className={classes.priceAndCategory}>
                                    <div className={classes.price}>$ {price}</div>
                                    <div className={classes.category}>{category}</div>  
                                </div>

                                {favorites(id)?
                                    <FontAwesomeIcon className={classes.favoriteActived} icon={fasFaHeart} onClick={()=>handleRemoveFavorite(product.id)} />
                                    :
                                    <FontAwesomeIcon className={classes.favorite} icon={farFaHeart} onClick={()=>handleAddFavorite(product.id)} />
                                }
                            </div>
                        </div>
                    </div>
            </div>
        )
    })
    
    return (
        <>  
            {renderList}
        </>
    )
}

export default ProductComponent