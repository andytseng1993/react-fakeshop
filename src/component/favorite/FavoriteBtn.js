import classes from './FavoriteBtn.module.css'
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";
import { useDispatch ,useSelector} from 'react-redux'
import { addFavoriteList, deleteFavoriteList, setLogInBox } from "../../redux/actions";
import ReminderBox from './ReminderBox'
import { useUserData } from '../../context/UserDataContext'
import { useUserAuth } from '../../context/UserAuthContext';

const FavoriteBtn=({favoriteList,productId})=>{
    const dispatch = useDispatch()
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const { writeUserData } = useUserData()
    const { currentUser } = useUserAuth()
    

    const favorites= (productId) =>{
        if(!favoriteList) return
        return favoriteList.includes(productId)
    }
    const handleRemoveFavorite = (productId)=>{
        dispatch(deleteFavoriteList(productId))
        writeUserData(`users/${currentUser.uid}/favorites/${productId}`,{})
    }
    const handleAddFavorite = (productId)=>{
        if(!currentUser){ 
            dispatch(setLogInBox(!openLogIn))
            lockScroll()
            return
        }
        dispatch(addFavoriteList(productId))
        writeUserData(`users/${currentUser.uid}/favorites/${productId}`,true) 
    }
    const lockScroll = useCallback(() => 
    {
        const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarCompensation}px`;
    }, [])

    return(
        <div style={{position: 'relative'}}>
            {favorites(productId)?
                <FontAwesomeIcon className={classes.favoriteActived} icon={fasFaHeart} onClick={()=>handleRemoveFavorite(productId)} />
                :
                <FontAwesomeIcon className={classes.favorite} icon={farFaHeart} onClick={()=>handleAddFavorite(productId)} />
            }
            <ReminderBox currentUser={currentUser} favorited={favorites(productId)} />
        </div>
    )
}
export default FavoriteBtn