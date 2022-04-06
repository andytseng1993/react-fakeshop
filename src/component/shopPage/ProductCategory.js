import { useDispatch, useSelector } from "react-redux"
import { setProductCategory } from "../../redux/actions"
import classes from './ProductCategory.module.css'

const ProductCategory=()=>{
    const dispatch=useDispatch()
    const select = useSelector((state)=> state.selectCategory)
    const products = useSelector((state)=> state.allProducts.products)

    function allCategories (products){
       let map={}
        let sort=[]
        products.forEach(({category})=>{
            if(!map[category]){
                map[category] = 1
                sort.push(category)
                sort.sort().reverse()
            }
        })
        return sort 
    }
    const categoryArray = allCategories(products)
    const categoryCheck = (category)=>{
        if(select===category) return `${classes.isActive}`
        else return ''
    }
    console.log(select);

    return(
        <>
            <div className={`${classes.category} ${categoryCheck('All Products')}`} onClick={()=> dispatch(setProductCategory('All Products'))}>
                All Products
            </div>
            {
                categoryArray.map((category)=>(
                    <div 
                        className={`${classes.category} ${categoryCheck(category)}`}
                        key={category} 
                        onClick={()=> dispatch(setProductCategory(category))}
                    >
                        {category}
                    </div>
                ))
            }
        </>
    )
}

export default ProductCategory