import classes from './FavoritLists.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom'
import FavoriteItem from './FavoriteItem'
import { useSelector } from 'react-redux';
import { useFetchFavoriteList } from '../../useFn/UseFetchFavoriteList';

const FavoritLists = ()=>{
    const favoriteList = useSelector((state)=>state.favorites)
    const {isLoading} = useFetchFavoriteList()

    return(
        <div className={classes.favoriteTiltle}>
            <div className={classes.routes}>
                <NavLink to='/account/home'>Account </NavLink>/<span style={{fontWeight:700}}> Favorites</span>
            </div>
            <div className={classes.title} >
                <FontAwesomeIcon icon={fasFaHeart} className={classes.love}/>
                <h3>Favorites</h3>
            </div>
            {
                isLoading? (<div>Loading...</div>)
                :
                favoriteList.length===0?
                    (<div className={classes.emptyFavorite} >
                        <FontAwesomeIcon icon={fasFaHeart} className={classes.emptyLove}/>
                        <h2>Show some love!</h2>
                        <p className={classes.emptyLovePar}>You can add items individually or save items while you shop.</p>
                    </div>)
                    :
                    (<div className='productList'>
                    {favoriteList.map((productId)=>(
                        <FavoriteItem key={productId} productId={productId} favoriteList={favoriteList} />
                    ))}
                        <span className="wrap" />
                    </div>)
            }
        </div>
    )
}
export default FavoritLists