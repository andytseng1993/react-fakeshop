import { useState } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';

const Address= ()=>{
    const [address,setAddress] = useState('')
    
    const handleChange = (value)=>{
        setAddress(value)
    }
    const handleSelect = (address, placeId, suggestion) => {
        console.log(address, suggestion);
        setAddress(address)
    }
    
    return(
        <div>
            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
                    <div>
                        <input 
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion)=>{
                                const style = suggestion.active?
                                    { backgroundColor: '#74d2e7', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' }

                                return (
                                    <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {style,})}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                )
                                
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}

export default Address