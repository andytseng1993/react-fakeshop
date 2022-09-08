import { useState } from 'react';
import classes from './ProductAddReview.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as fasFaStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'

const ProductAddReview=()=>{
    const [ratingInput,setRatingInput] = useState(0)
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
    return(
        <div>
            <div className={classes.addReviewArea}>
                <h1>Review this item</h1>
                <form>
                    <label className={classes.addReviewNickname}>Nickname:
                        <input type='text' maxLength="25"></input>
                    </label>
                    <div className={classes.addReviewRating}>
                            <div> Select a Rating : </div>
                            <div>
                                {writeRating()}
                            </div>
                    </div>
                    <label className={classes.addReviewTitle}>Add a title:
                        <input type='text' maxLength="50"></input>
                    </label>
                    <label className={classes.addReviewDescription}>
                        <p>
                            Please provide description! Your reviews help other shoppers:
                        </p>
                        <textarea rows="8" cols="80" maxLength="3000"></textarea>
                    </label>
                    <div className={classes.addReviewBtn}>
                        <button>Cancel</button>
                        <button>Submit review</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ProductAddReview