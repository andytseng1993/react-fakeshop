import {useState} from 'react'
import classes from './ProductReviews.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'



const ProductReviews=()=>{
    const [rating,setRating] = useState(3.5)
    const [totalReviews,setTotalReviews] = useState(70)
    return(
        <div className={classes.productDetail}>
                <h1 className={classes.productArea}>Customer reviews & ratings</h1>
                <div className={classes.description}>
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
                                <div className={classes.fullStars}>
                                    <FontAwesomeIcon icon={fasFaStar} />
                                    <FontAwesomeIcon icon={fasFaStar} />
                                    <FontAwesomeIcon icon={fasFaStar} />
                                    <FontAwesomeIcon icon={fasFaStar} />
                                    <FontAwesomeIcon icon={fasFaStar} />
                                </div>
                            </div>
                            <span> ({totalReviews} reviews)</span>
                        </div>
                        <button className={classes.writeReviewBtn}>Write a review</button>
                    </div>
                    <div className={classes.ratingHistogram}>
                        <button className={classes.starLink}>
                            <div className={classes.ratingText}>5 stars</div>
                            <div className={classes.ratingBar}>
                                <div className={classes.barPercent}></div>
                            </div>
                            <span className={classes.ratingPercent}>78%</span>
                        </button>
                        <button className={classes.starLink}>
                            <div className={classes.ratingText}>4 stars</div>
                            <div className={classes.ratingBar}>
                                <div className={classes.barPercent}></div>
                            </div>
                            <span className={classes.ratingPercent}>11%</span>
                        </button>
                        <button className={classes.starLink}>
                            <div className={classes.ratingText}>3 stars</div>
                            <div className={classes.ratingBar}>
                                <div className={classes.barPercent}></div>
                            </div>
                            <span className={classes.ratingPercent}>0%</span>
                        </button>
                        <button className={classes.starLink}>
                            <div className={classes.ratingText}>2 stars</div>
                            <div className={classes.ratingBar}>
                                <div className={classes.barPercent}></div>
                            </div>
                            <span className={classes.ratingPercent}>1%</span>
                        </button>
                        <button className={classes.starLink}>
                            <div className={classes.ratingText}>1 star</div>
                            <div className={classes.ratingBar}>
                                <div className={classes.barPercent}></div>
                            </div>
                            <span className={classes.ratingPercent}>10%</span>
                        </button>
                    </div>
                </div>
                <hr/>
                <div className={classes.reviewFilter}>
                    <label className={classes.reviewSelect}>Filter:  
                        <select>
                            <option>All ratings</option>
                            <option>5 stars</option>
                            <option>4 stars</option>
                            <option>3 stars</option>
                            <option>2 stars</option>
                            <option>1 star</option>
                        </select>
                    </label>
                    <div>We found 0 matching reviews</div>
                </div>
                <div className={classes.reviewBox}>
                    <div className={classes.reviewDetail}>
                        <div className={classes.reviewSummary}>
                            <div className={classes.reviewTitle}>Love it!</div>
                            <div className={classes.reviewRating}>
                                <FontAwesomeIcon icon={farFaStar} />
                                <FontAwesomeIcon icon={farFaStar} />
                                <FontAwesomeIcon icon={farFaStar} />
                                <FontAwesomeIcon icon={farFaStar} />
                                <FontAwesomeIcon icon={farFaStar} />
                            </div>
                            <div className={classes.reviewWriter}>Little1kt</div>
                        </div>
                        <div className={classes.reviewDay}>5/31/2022</div>
                    </div>
                    <div className={classes.reviewText}>Wow! I love this set. I think the magnetic block is super stylish and a fun way to display the set and you can add other knives you might have to it. The knives themselves are super high quality and cut through things like butter</div>
                </div>
            </div>
    )
}
export default ProductReviews