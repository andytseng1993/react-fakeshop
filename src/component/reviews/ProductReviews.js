import {useEffect, useState, useCallback} from 'react'
import classes from './ProductReviews.module.css'
import ProductAddReview from './ProductAddReview';
import RatingSummary from './RatingSummary';
import ReviewList from './ReviewList';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { setLogInBox } from "../../redux/actions"
import { useUserAuth } from '../../context/UserAuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';

const ProductReviews=({productId})=>{
    const [rating,setRating] = useState(0)
    const [reviewFilter,setReviewFilter] = useState('all')
    const [addReview,setAddReview] = useState(false)
    const dispatch = useDispatch()
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const userName = useSelector((state)=> state.setUserName) 
    const [addReviewSuccess,setAddReviewSuccess] = useState('')
    const {currentUser} = useUserAuth()
    const [update,setUpdate] = useState(false)
    
    const fetchProductReviews = async ()=>{
        let allReviewData= []
        const { data } = await axios.get(`https://fakestore-2bc85-default-rtdb.firebaseio.com/productReviews/${productId}.json`);
        for (let key in data) {
            allReviewData = [...allReviewData,{ ...data[key] }]
        }
        return allReviewData
    }
    const useReviewQuery = (select,notifyOnChangeProps) =>useQuery(['productReviews',productId], fetchProductReviews, { select , notifyOnChangeProps })
    const useReviewsNum = () => useReviewQuery((data) => data.length,['data'])
    const useReview = () =>useReviewQuery((data) => {
        let reviews = { all: [] }
        let starsPercentObj = {}
        for (let i = 5; i > 0; i--) {
            let res = data.filter((review) => review.ReviewStars === i);
            let precent = Math.floor(res.length / data.length * 100);
            starsPercentObj[i] = precent
            reviews[i] = res;
            reviews.all.push(...res);
        }
        return {reviews,starsPercentObj}
    },['data'])
    const {data:AllReviewsData,refetch} = useReviewQuery()
    const {data:reviewsCount} = useReviewsNum()
    const {data:reviewsData,isLoading} = useReview()

    const mutation = useMutation({
        mutationFn: newData =>{
            return axios.put(`https://fakestore-2bc85-default-rtdb.firebaseio.com/productRating/${productId}.json`,newData)
    }})

    useEffect(()=>{
        if(reviewsCount>0){
            const totalStars = AllReviewsData.map((data)=>data.ReviewStars).reduce((previousValue, currentValue) => previousValue + currentValue,0)
            const ratingStars = Math.floor(totalStars*10/reviewsCount)/10
            if(update){
                mutation.mutate({rating:ratingStars,reviewCount:reviewsCount})
                setUpdate(false)
            } 
            return setRating(ratingStars)
        }
        setRating(0)
    },[AllReviewsData])

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
        refetch()
        setUpdate(true)
        setTimeout(() => {
            setAddReviewSuccess('')
        }, 3000)
    }
    if(isLoading) return (
        <h2>Loading...</h2>
    )
    return(
        <div className={classes.productDetail}>
            <h1 className={classes.productArea}>Customer reviews & ratings</h1>
            <div className={classes.description}>
                <RatingSummary 
                    rating={rating} 
                    reviewsNum={reviewsCount} 
                    handleAddReview={handleAddReview} 
                    handleStarBar={handleStarBar} 
                    starBarPercent={reviewsData?.starsPercentObj}
                />
            </div>
            <hr/>
            {addReview? <ProductAddReview  currentUser={currentUser} cancelAddReview={handleCancelReview} productId={productId} submitReview={handleSubmitReview} allReviewData={reviewsData.reviews['all']}/>:null}
            {addReviewSuccess ? <div className={classes.addReviewSuccess}>{addReviewSuccess}</div> :null}
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
                <div>We found {reviewsData.reviews[reviewFilter].length??0} matching reviews</div>
            </div>
            <ReviewList rewiewsFilterData={reviewsData.reviews} reviewFilter={reviewFilter} />
        </div>
    )
}
export default ProductReviews