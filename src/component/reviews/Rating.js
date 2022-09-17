import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import classes from './Rating.module.css'

const Rating= ({rating,reviewsNum,fontSize})=>{
    return (
        <>
            <div className={classes.ratingStars} style={{fontSize: fontSize}}>
                <div className={classes.emptyStars}>
                    <FontAwesomeIcon icon={farFaStar} />
                    <FontAwesomeIcon icon={farFaStar} />
                    <FontAwesomeIcon icon={farFaStar} />
                    <FontAwesomeIcon icon={farFaStar} />
                    <FontAwesomeIcon icon={farFaStar} />
                </div>
                <div className={classes.fullStars} style={{width:rating*20+'%'}}>
                    <FontAwesomeIcon icon={fasFaStar} />
                    <FontAwesomeIcon icon={fasFaStar} />
                    <FontAwesomeIcon icon={fasFaStar} />
                    <FontAwesomeIcon icon={fasFaStar} />
                    <FontAwesomeIcon icon={fasFaStar} />
                </div>
            </div>
            <span style={{fontSize: fontSize}}> ({reviewsNum} reviews)</span>
        </>
    )
}
export default Rating