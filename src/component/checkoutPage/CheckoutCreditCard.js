import AddressInput from "../address/AddressInput"
import classes from './CheckoutCreditCard.module.css'
import { useState } from "react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const CheckoutCreditCard =()=>{
    const [card,setCard]= useState({number:'',cvc:'',expiry:'',focus:'',name:'',})

    const handleChangeCard = ({target})=>{
        
        if(target.name ==='number'||target.name ==='expiry'||target.name ==='cvc'){
            const value = target.value.replace(/[^0-9]/g,'')
            return setCard(pre=>{return{...pre,[target.name]:value}})
        }

        setCard(pre=>{return{...pre,[target.name]:target.value}})
    }
    const handleInputFocus =({target})=>{
        setCard(pre=>{return{...pre,focus:target.name}})
    }
    console.log(card);
    return (
        <div className={classes.creditCardArea}>
            <div>Your credit or debit card</div>
            <div className={classes.creditCard}>
                <form className={classes.creditCardForm}>
                    <AddressInput title={'Card number*'} value={card.number} 
                        required='required' pattern="[\d| ]{16,22}" name={'number'} type={'tel'}
                        handleChange={handleChangeCard} onFocus={handleInputFocus}
                    />
                    <AddressInput title={'Name on Card*'} value={card.name} 
                        required='required' pattern="[\d| ]{16,22}" name={'name'} 
                        onFocus={handleInputFocus} handleChange={handleChangeCard}
                    />
                    <div style={{display:'flex',width:'70%'}}>
                        <AddressInput title={'Exp Date*'} value={card.expiry} 
                            required='required' pattern="\d\d/\d\d" name={'expiry'} type={'tel'}
                            onFocus={handleInputFocus} handleChange={handleChangeCard}
                        />
                        <AddressInput title={'CVC*'} value={card.cvc} 
                            required='required' pattern="\d{3,4}" name={'cvc'} type={'tel'}
                            onFocus={handleInputFocus} handleChange={handleChangeCard}
                        />
                    </div>
                </form>
                <Cards
                    className={classes.cards}
                    number={card.number}
                    name={card.name}
                    expiry={card.expiry}
                    cvc={card.cvc}
                    focused={card.focus}
                    />
            </div>
        </div>
    )
}
export default CheckoutCreditCard