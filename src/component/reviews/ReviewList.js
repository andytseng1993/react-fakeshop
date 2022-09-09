import classes from './ReviewList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'

const ReviewList =({rewiewsFilterData,reviewFilter})=>{
    
    const rewiewStars=(num)=>{
        const starsRow = []
        for(let i=1; i<=num; i++){
            starsRow.push(<FontAwesomeIcon icon={fasFaStar} key={i}/>)
        }
        for(let n=5;n>num;n--){
            starsRow.push(<FontAwesomeIcon icon={farFaStar} key={n}/>)
        }
        return starsRow
    }
    const Time = (time)=>{
        const event = new Date(time)
        return event.toLocaleString().split(',')[0]
    }
    return(
        <>
            {
                rewiewsFilterData[reviewFilter]?.length? 
                rewiewsFilterData[reviewFilter].map((review,index)=>{
                    return(
                        <div className={classes.reviewBox}  key={index}>
                            <div className={classes.reviewDetail}>
                                <div className={classes.reviewSummary}>
                                    <div className={classes.reviewTitle}>{review.Title}</div>
                                    <div className={classes.reviewRating}>
                                        {rewiewStars(review.ReviewStars)}
                                    </div>
                                    <div className={classes.reviewWriter}>{review.Author.nickname}</div>
                                </div>
                                <div className={classes.reviewDay}>{Time(review.Time)}</div>
                            </div>
                            <div className={classes.reviewText}>{review.Text}</div>
                        </div>
                    )
                })
                :
                ( 
                    <div className={classes.reviewBox}>
                        This item doesn't have reviews in {reviewFilter} stars.
                    </div>
                )
            }
        </>
    )
}
export default ReviewList