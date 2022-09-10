    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";
import FavoritLists from '../component/favorite/FavoriteLists';

const FavoritePage=()=>{
    return(
        <>
            <div style={{fontSize:30}}>
                <FontAwesomeIcon icon={fasFaHeart} />
                Favorites
            </div>
            <FavoritLists/>
        </>
    )
}
export default FavoritePage