import {useEffect, useState, useCallback} from 'react'
import classes from './ProductReviews.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import ProductAddReview from './ProductAddReview';
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox } from "../../redux/actions"
import axios from 'axios';

const ProductReviews=({productId})=>{
    const [rating,setRating] = useState(0)
    const [reviewFilter,setReviewFilter] = useState('all')
    const [rewiewsFilterData,setRewiewsFilterData] = useState([])
    const [starBarPercent,setStarBarPercent] = useState({})
    const [addReview,setAddReview] = useState(false)
    const dispatch = useDispatch()
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const userName = useSelector((state)=> state.setUserName) 
    const [addReviewSuccess,setAddReviewSuccess] = useState('')

    useEffect(()=>{
        let allReviewData= []
        axios
            .get(`https://fakestore-2bc85-default-rtdb.firebaseio.com/${productId}.json`)
            .then(({data})=>{
               for(let key in data){
                const review={...data[key]}
                allReviewData.push(review)
               }
               if(allReviewData.length>0){
                   const AllStars = allReviewData.map((data)=>data.ReviewStars).reduce((previousValue, currentValue) => previousValue + currentValue,0)
                   setRating(Math.floor(AllStars*10/allReviewData.length)/10)
               }else{
                    setRating(0)
               }
               let reviews = {all:[]}
               let starsPercentObj = {}
               for(let i=5;i>0;i--){
                   let res = allReviewData.filter((review)=> review.ReviewStars === i)
                   let precent = Math.floor(res.length/allReviewData.length*100)
                   starsPercentObj[i]= precent
                   reviews[i]=res
                   reviews.all.push(...res)
               }
               setRewiewsFilterData(reviews)
               setStarBarPercent(starsPercentObj)
            })
            .catch((err)=> console.log(err))
    },[addReviewSuccess,productId])

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
        setReviewFilter(event.target.value);
    }
    const handleStarBar = (num)=>{
        setReviewFilter(num)
    }
    const lockScroll = useCallback(
        () => {
            const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarCompensation}px`;
        }, []) 
  
    const handleAddReview = ()=>{
        if(userName){
            setAddReview(true)
            return
        }
        dispatch(setLogInBox(!openLogIn))
        lockScroll()
    }
    const handleCancelReview=()=>{
        setAddReview(false)
    }
    const handleSubmitReview=()=>{
        setAddReview(false)
        setAddReviewSuccess('Thank you for adding review!')
        setTimeout(() => {
            setAddReviewSuccess('')
        }, 3000)
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
                        <button className={classes.writeReviewBtn} onClick={handleAddReview}>Write a review</button>
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
                </div>
                <hr/>
                {addReview && <ProductAddReview  name={userName} cancelAddReview={handleCancelReview} productId={productId} submitReview={handleSubmitReview}/>}
                {addReviewSuccess && <div className={classes.addReviewSuccess}>{addReviewSuccess}</div> }
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