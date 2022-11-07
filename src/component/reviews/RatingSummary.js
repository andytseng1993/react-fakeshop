import classes from './RatingSummary.module.css'
import Rating from './Rating';

const RatingSummary=({rating,reviewsNum,handleAddReview,handleStarBar,starBarPercent})=>{
    return(
        <>
            <div className={classes.ratingSummary}>
                <div className={classes.ratingNumber}>
                    <div className={classes.rating}>{rating}</div>
                    <div style={{fontSize:'18px'}}>out of 5</div>
                </div>
                <div style={{display:'flex'}}>
                    <Rating rating={rating} reviewsNum={reviewsNum} fontSize={18}/>
                </div>
                <button className={classes.writeReviewBtn} onClick={()=>handleAddReview()}>Write a review</button>
            </div>
            {rating>0?
                <div className={classes.ratingHistogram}>
                    {[5,4,3,2,1].map((num)=>{return(
                        <button className={classes.starLink} onClick={()=>handleStarBar(num)} key={num}>
                            <div className={classes.ratingText}>{num} stars</div>
                            <div className={classes.ratingBar}>
                                <div className={classes.barPercent} style={{width:starBarPercent[num]+'%'}}></div>
                            </div>
                            <span className={classes.ratingPercent}>{starBarPercent[num]+'%'}</span>
                        </button>
                    )})}
                </div>
                :null
            }
        </>

    )
}
export default RatingSummary