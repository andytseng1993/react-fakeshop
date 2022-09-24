import PlacesAutocomplete from 'react-places-autocomplete';
import classes from './AddressAutoComplete.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const AddressAutoComplete = ({street,handleChangeAuto,handleSelectAuto})=>{
    const [isFocus,setIsFocus] = useState(false)
    const onFocusChange = ()=>{
        setIsFocus(true)
    }
    const onBlurChange = ()=>{
        setIsFocus(false)
    }
    const isFocusStyle ={
        top: '4px',
        left: '0px',
        fontSize: '13px',
        padding: '1px 5px',
        backgroundColor: 'white',
        zIndex: 15,
        color: 'black', 
    }
    return(
        <PlacesAutocomplete value={street} onChange={handleChangeAuto} onSelect={handleSelectAuto}>
            {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
                <div className={classes.addressAuto}>
                    <div className={classes.searchBox} onFocus={onFocusChange} onBlur={onBlurChange}>
                        <label className={classes.searchLabel} style={(isFocus||street)?isFocusStyle:{}} htmlFor='AddressAutoComplete'>
                            <span>Street Adress*</span>
                        </label>
                        <input required id='AddressAutoComplete'
                            {...getInputProps({
                                className: classes.searchInput,
                            })}
                        />
                    </div>
                    <div className={classes.suggestionZone}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion)=>{
                            console.log(suggestion);
                            const className = suggestion.active?
                            classes.suggestionItemActive
                            : classes.suggestionItem
                            const style = suggestion.active?
                                { backgroundColor: '#74d2e7', cursor: 'pointer' }
                                : { cursor: 'pointer' }

                            return (
                                <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {className,style,})} className={classes.suggestion}>
                                    <FontAwesomeIcon icon={faLocationCrosshairs}  className={classes.addressCrosshairs}/>
                                    <div>
                                        <div className={classes.mainText}>{suggestion.formattedSuggestion.mainText}</div>
                                        <div className={classes.secondaryText}>{suggestion.formattedSuggestion.secondaryText}</div>
                                    </div>
                                </div>
                            )
                            
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default AddressAutoComplete