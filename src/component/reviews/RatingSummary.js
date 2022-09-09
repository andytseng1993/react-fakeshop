import classes from './RatingSummary.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'

const RatingSummary=({rating,rewiewsFilterData,handleAddReview,handleStarBar,starBarPercent})=>{

    return(
        <>
            <div className={classes.ratingSummary}>
                <div className={classes.ratingNumber}>
                    <div className={classes.rating}>{rating}</div>
                    <div style={{fontSize:'18px'}}>out of 5</div>
                </div>
                <div style={{display:'flex'}}>
                    <div className={classes.ratingStars}>
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
                    <span> ({rewiewsFilterData.all?.length} reviews)</span>
                </div>
                <button className={classes.writeReviewBtn} onClick={()=>handleAddReview()}>Write a review</button>
            </div>
            {rating>0 && <div className={classes.ratingHistogram}>
                {[5,4,3,2,1].map((num)=>{return(
                    <button className={classes.starLink} onClick={()=>handleStarBar(num)} key={num}>
                        <div className={classes.ratingText}>{num} stars</div>
                        <div className={classes.ratingBar}>
                            <div className={classes.barPercent} style={{width:starBarPercent[num]+'%'}}></div>
                        </div>
                        <span className={classes.ratingPercent}>{starBarPercent[num]+'%'}</span>
                    </button>
                )})}
            </div>}
        </>

    )
}
export default RatingSummary