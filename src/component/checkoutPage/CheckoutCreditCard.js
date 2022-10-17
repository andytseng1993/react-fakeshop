import AddressInput from "../address/AddressInput"
import classes from './CheckoutCreditCard.module.css'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {formatCreditCardNumber,formatCVC,formatExpirationDate} from "./utils";

const CheckoutCreditCard =({card,setCard})=>{
    
    const handleChangeCard = ({target})=>{
        if(target.name ==='number'){ 
            target.value = formatCreditCardNumber(target.value)[0]||''
            const issuer = formatCreditCardNumber(target.value)[1]||''
            return setCard(pre=>{return{...pre,[target.name]:target.value,issuer:issuer}})
        }
        else if(target.name ==='name') target.value = target.value.toUpperCase()
        else if(target.name ==='expiry') target.value = formatExpirationDate(target.value)
        else if(target.name ==='cvc') target.value = formatCVC(target.value)
        setCard(pre=>{return{...pre,[target.name]:target.value}})
    }
    const handleInputFocus =({target})=>{
        setCard(pre=>{return{...pre,focus:target.name}})
    }
    
    return (
        <div className={classes.creditCardArea}>
            <div className={classes.creditCardTitle}>Your credit or debit card</div>
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