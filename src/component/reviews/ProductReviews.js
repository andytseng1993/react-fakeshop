import {useEffect, useState, useCallback} from 'react'
import classes from './ProductReviews.module.css'
import ProductAddReview from './ProductAddReview';
import RatingSummary from './RatingSummary';
import ReviewList from './ReviewList';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox } from "../../redux/actions"
import { useUserAuth } from '../../context/UserAuthContext';

const ProductReviews=({productId})=>{
    const [rating,setRating] = useState(0)
    const [reviewFilter,setReviewFilter] = useState('all')
    const [rewiewsFilterData,setRewiewsFilterData] = useState([])
    const [starBarPercent,setStarBarPercent] = useState({})
    const [addReview,setAddReview] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const dispatch = useDispatch()
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const userName = useSelector((state)=> state.setUserName) 
    const [addReviewSuccess,setAddReviewSuccess] = useState('')
    const {currentUser} = useUserAuth()
    
    useEffect(()=>{
        let allReviewData= []
        axios
            .get(`https://fakestore-2bc85-default-rtdb.firebaseio.com/productReviews/${productId}.json`)
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
    },[refresh,productId])

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
        setRefresh(!refresh)
        setTimeout(() => {
            setAddReviewSuccess('')
        }, 3000)
    }

    return(
        <div className={classes.productDetail}>
                <h1 className={classes.productArea}>Customer reviews & ratings</h1>
                <div className={classes.description}>
                    <RatingSummary 
                        rating={rating} 
                        rewiewsFilterData={rewiewsFilterData} 
                        handleAddReview={handleAddReview} 
                        handleStarBar={handleStarBar} 
                        starBarPercent={starBarPercent}
                    />
                </div>
                <hr/>
                {addReview && <ProductAddReview  currentUser={currentUser} cancelAddReview={handleCancelReview} productId={productId} submitReview={handleSubmitReview}/>}
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
                <ReviewList rewiewsFilterData={rewiewsFilterData} reviewFilter={reviewFilter} />
            </div>
    )
}
export default ProductReviews