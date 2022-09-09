import { useState } from 'react';
import axios from 'axios';
import classes from './ProductAddReview.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import { nanoid } from 'nanoid';

const ProductAddReview=({currentUser,cancelAddReview,productId,submitReview})=>{
    const [ratingInput,setRatingInput] = useState(0)
    const [nameInput,setNameInput] = useState(currentUser.displayName)
    const [titleInput,setTitleInput] = useState('')
    const [descriptionInput,setDescriptionInput] = useState('')
    const [warning,setWarning] = useState('')
    
    const writeRating=()=>{
        let star=[]
        for(let i=0;i<ratingInput;i++){
            star.push(<FontAwesomeIcon icon={fasFaStar} key={i} onClick={()=>setRatingInput(i+1)}/>)
        }
        for(let i=ratingInput;i<5;i++){
            star.push(<FontAwesomeIcon icon={farFaStar} key={i} onClick={()=>setRatingInput(i+1)}/>)
        }
        return star
    }
    const handleNameChange=(event)=>{
        setNameInput(event.target.value)
    }
    const handleTitleChange =(event)=>{
        setTitleInput(event.target.value)
    }
    const handleDescriptionChange =(event)=>{
        setDescriptionInput(event.target.value)
    }
    const handleCancel =(event)=>{
        event.preventDefault()
        cancelAddReview()
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        if(!nameInput){
            setWarning('Please enter a nickname to submit a review.')
            return
        }
        if(!ratingInput){
            setWarning('Please select a rating from one to five stars to submit a review.')
            return
        }
        if(!descriptionInput){
            setWarning('Please enter a title to submit a review.')
            return
        }
        if(!titleInput){
            setWarning('Please enter a title to submit a review.')
            return
        }
        setWarning('')
        const reviewData ={
            id: nanoid(),
            Title: titleInput,
            ReviewStars : ratingInput,
            Author: {
                nickname:nameInput,
                uid: currentUser.uid
            },
            Time: Date(),
            Text: descriptionInput 
        }
        axios
            .post(`https://fakestore-2bc85-default-rtdb.firebaseio.com/${productId}.json`,reviewData)
            .then(()=>{
                submitReview()
            }).catch((err)=>[
                setWarning(err)
            ])
    }
    return(
        <div>
            <div className={classes.addReviewArea}>
                <h1>Review this item</h1>
                <form>
                    <label className={classes.addReviewNickname}>
                        <p>Nickname:</p>
                        <input type='text' value={nameInput} onChange={handleNameChange} maxLength="25" required></input>
                        <div className={classes.wordCount}>{nameInput.length}/25</div>
                    </label>
                    <div className={classes.addReviewRating}>
                            <div> Select a Rating : </div>
                            <div className={classes.rating}>
                                {writeRating()}
                            </div>
                    </div>
                    <label className={classes.addReviewTitle}>Add a title:
                        <input type='text' maxLength="50" value={titleInput} onChange={handleTitleChange} required></input>
                        <div className={classes.wordCount}>{titleInput.length}/50</div>
                    </label>
                    <label className={classes.addReviewDescription}>
                        <p>
                            Please provide description! Your reviews help other shoppers:
                        </p>
                        <textarea rows="8" cols="75" maxLength="3000" value={descriptionInput} onChange={handleDescriptionChange} required></textarea>
                        <div className={classes.wordCount}>{descriptionInput.length}/3000</div>
                    </label>
                    {warning && <div className={classes.warning}>{warning}</div>}
                    <div className={classes.addReviewBtn}>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleSubmit}>Submit review</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ProductAddReview