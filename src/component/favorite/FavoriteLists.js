import classes from './FavoritLists.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom'
import FavoriteItem from './FavoriteItem'
import { useQuery } from '@tanstack/react-query'
import { useUserAuth } from '../../context/UserAuthContext'
import { useUserData } from '../../context/UserDataContext'

const FavoritLists = ()=>{
    const {currentUser}=useUserAuth()
    const {readUserData} = useUserData()
    
    const transformFavorateArray = (data) =>{
        let favorites =[]
        data.forEach(element => {
            favorites.push(parseInt(element.key))
        })
        return favorites
    }
    const {data,isLoading} = useQuery({ queryKey: ['favorites'], queryFn: async ()=>{
        const response = await readUserData('users/'+currentUser.uid+'/favorites')
        return response
    },refetchOnWindowFocus:false,select:transformFavorateArray})
    
    const emptyFavorite = (
        <div className={classes.emptyFavorite} >
            <FontAwesomeIcon icon={fasFaHeart} className={classes.emptyLove}/>
            <h2>Show some love!</h2>
            <p className={classes.emptyLovePar}>You can add items individually or save items while you shop.</p>
        </div>
    )
    console.log(isLoading,data);
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
                data.length===0?
                    emptyFavorite
                    :
                    (<div className='productList'>
                    {data.map((productId)=>(
                        <FavoriteItem key={productId} productId={productId} favoriteList={data} />
                    ))}
                        <span className="wrap" />
                    </div>)
            }
        </div>

    )
}
export default FavoritLists