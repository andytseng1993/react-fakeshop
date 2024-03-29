import classes from './CheckoutComfirmAddress.module.css'

const CheckoutComfirmAddress =({address,emailValue,isLoad})=>{
    if(isLoad){
        return(
            <div>Loading</div>
        )
    }
    return(
        <div style={{padding: '15px 30px'}}>
            <div className={classes.addressName}>{address.firstName} {address.lastName}</div>
            <div className={classes.addressStreet}>{address.street} {address.apt}, {address.city}, {address.state} {address.zipCode}</div>
            <div style={{height:7}} ></div>
            <div className={classes.addressStreet}>Email: {emailValue}</div>
            <div className={classes.addressStreet}>Phone number: {address.phone}</div>
        </div>
    )
}
export default CheckoutComfirmAddress