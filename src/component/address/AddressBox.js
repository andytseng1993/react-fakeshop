import classes from './AddressBox.module.css'

const AddressBox=({address,handleEdit,handleRemove})=>{
    return (
        <div className={classes.card}>
            <div className={classes.addressSummary}>
                {address.default && <div className={classes.addressDefault}>&#9733; Default address</div>}
                <div className={classes.addressName}>{address.firstName} {address.lastName}</div>
                <div className={classes.addressStreet}>{address.street} {address.apt}</div>
                <div className={classes.addressCity}>{address.city}, {address.state} {address.zipCode}</div>
                <div className={classes.addressPhone}>Phone number: {address.phone}</div>
            </div>
            <div className={classes.buttons}>
                <button className={classes.addressEdit} onClick={(e)=>handleEdit(e,address.key)}>Edit</button>
                <button className={classes.addressRemove} onClick={(e)=>handleRemove(e,address.key)}>Remove</button>
            </div>
        </div>
    )
}
export default AddressBox