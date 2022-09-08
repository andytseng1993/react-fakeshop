import {useEffect, useState} from 'react'
import classes from './ProductReviews.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import ProductAddReview from './ProductAddReview';
import { useUserAuth } from '../../context/UserAuthContext';


let text=[
    {
        Title: 'Love it!',
        ReviewStars : 3,
        Writer: 'Little1kt',
        Day: '5/31/2022',
        Text: 'Wow! I love this set. I think the magnetic block is super stylish and a fun way to display the set and you can add other knives you might have to it. The knives themselves are super high quality and cut through things like butter'
    },
    {
        Title: 'Love it!',
        ReviewStars : 2 ,
        Writer: 'SDAqwe',
        Day: '5/31/2022',
        Text: 'Wow! I love this set. I think the magnetic block is super stylish and a fun way to display the set and you can add other knives you might have to it. The knives themselves are super high quality and cut through things like butter'
    },
    {
        Title: 'Love it!',
        ReviewStars : 2 ,
        Writer: 'SDAqwe',
        Day: '5/31/2022',
        Text: 'Wow! I love this set. I think the magnetic block is super stylish and a fun way to display the set and you can add other knives you might have to it. The knives themselves are super high quality and cut through things like butter'
    }
]
const ProductReviews=()=>{
    const [rating,setRating] = useState(0)
    const [reviewFilter,setReviewFilter] = useState('all')
    const [rewiewsFilterData,setRewiewsFilterData] = useState([])
    const [starBarPercent,setStarBarPercent] = useState({})
    const {currentUser} = useUserAuth()

    console.log(currentUser?'yes':'No');
    useEffect(()=>{
        const AllStars = text.map((data)=>data.ReviewStars).reduce((previousValue, currentValue) => previousValue + currentValue,0)
        setRating(Math.floor(AllStars*10/text.length)/10)
        let reviews = {all:[]}
        let starsPercentObj = {}
        for(let i=5;i>0;i--){
            let res = text.filter((review)=> review.ReviewStars === i)
            let precent = Math.floor(res.length/text.length*100)
            starsPercentObj[i]= precent
            reviews[i]=res
            reviews.all.push(...res)
        }
        setRewiewsFilterData(reviews)
        setStarBarPercent(starsPercentObj)
    },[])

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
    const handleChange=(event)=>{
        console.log(event);
        setReviewFilter(event.target.value);
    }
    const handleStarBar = (num)=>{
        setReviewFilter(num)
    }
    
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
                        <button className={classes.writeReviewBtn}>Write a review</button>
                    </div>
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
                </div>
                <hr/>
                <ProductAddReview />
                <div className={classes.reviewFilter}>
                    <label className={classes.reviewSelect}>Filter:  
                        <select value={reviewFilter} onChange={handleChange} >
                            <option value={'all'}>All ratings</option>
                            <option value={5}>5 stars</option>
                            <option value={4}>4 stars</option>
                            <option value={3}>3 stars</option>
                            <option value={2}>2 stars</option>
                            <option value={1}>1 star</option>
                        </select>
                    </label>
                    <div>We found {rewiewsFilterData[reviewFilter]?.length} matching reviews</div>
                </div>
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
                                            <div className={classes.reviewWriter}>{review.Writer}</div>
                                        </div>
                                        <div className={classes.reviewDay}>{review.Day}</div>
                                    </div>
                                    <div className={classes.reviewText}>{review.Text}</div>
                                </div>
                            )
                        }):
                        ( 
                            <div className={classes.reviewBox}>
                                This item doesn't have reviews.
                            </div>
                        )
                    }
            </div>
    )
}
export default ProductReviews