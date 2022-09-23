import PlacesAutocomplete from 'react-places-autocomplete';
import classes from './AddressAutoComplete.module.css'
const AddressAutoComplete = ({address,handleChange,handleSelect})=>{

    return(
        <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
            {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
                <div>
                    <div className={classes.searchBox}>
                        <label className={classes.searchLabel}>
                            <span>Street Adress*</span>
                        </label>
                        <input 
                            {...getInputProps({
                                className: classes.searchInput,
                            })}
                        />
                    </div>
                    <div>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion)=>{
                            const className = suggestion.active?
                            classes.suggestionItemActive
                            : classes.suggestionItem
                            const style = suggestion.active?
                                { backgroundColor: '#74d2e7', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' }

                            return (
                                <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {className,style,})}>
                                    <span>{suggestion.description}</span>
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