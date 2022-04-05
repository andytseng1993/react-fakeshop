import { useSelector } from 'react-redux'
import classes from './ProductComponent.module.css'

const ProductComponent=()=>{
    const products = useSelector((state)=>state.allProducts.products)
    const renderList = products.map((product)=>{
        const {id,title,image,price,category} = product
        return(
            <div className={classes.container} key={id}>
                <div className={classes.cards}>
                    <div className={classes.image}>
                        <img src={image} alt={title}></img>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.header}>{title}</div>
                        <div className={classes.price}>$ {price}</div>
                        <div className={classes.category}>{category}</div>
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