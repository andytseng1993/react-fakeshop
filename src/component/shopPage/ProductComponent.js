import {useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './ProductComponent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";

const ProductComponent=()=>{
    const [favorite,setFavorite] = useState(false)
    const productCategory = useSelector((state)=>state.selectCategory)
    const allProducts = useSelector((state)=>state.allProducts.products)
    let products
    if(productCategory!== ''){
        products= allProducts.filter(({category})=> category===productCategory)
    }
    if(productCategory=== 'All Products'){
        products= allProducts
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

                                {favorite?
                                    <FontAwesomeIcon className={classes.favoriteActived} icon={fasFaHeart} onClick={()=> setFavorite(!favorite)} />
                                    :
                                    <FontAwesomeIcon className={classes.favorite} icon={farFaHeart} onClick={()=> setFavorite(!favorite)} />
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