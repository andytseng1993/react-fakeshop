import classes from './AddressForm.module.css'
import { useRef, useState } from 'react'
import AddressAutoComplete from './AddressAutoComplete'
import AddressInput from './AddressInput'
import Input from 'react-phone-number-input/input'
import Select from 'react-select'
import { geocodeByAddress } from 'react-places-autocomplete'
import { isValidPhoneNumber } from 'react-phone-number-input'

const AddressForm = ({
	phoneInput,
	defaultAddress,
	leftBtnName,
	rightBtnName,
	address,
	setAddress,
	checked,
	setChecked,
	handleCancel,
	handleSave,
	emailInput,
	emailValue,
	seteEmailValue,
}) => {
	const [isFocus, setIsFocus] = useState(false)
	const [error, setError] = useState('')
	const aptRef = useRef(null)
	const onFocusChange = () => {
		setIsFocus(true)
	}
	const onBlurChange = () => {
		setIsFocus(false)
		if (address.phone.length === 0)
			return setError('Please enter a valid Phone number*.')
		if (!isValidPhoneNumber(address.phone))
			return setError('Invalid phone number')
		setError('')
	}
	const handleChangeAddress = (e, changeName) => {
		if (e.target.value.length === 0)
			return setAddress((pre) => {
				return { ...pre, [changeName]: e.target.value }
			})
		if (changeName === 'zipCode') {
			const zip = e.target.value.replace(/[^0-9]/g, '')
			return setAddress((pre) => {
				return { ...pre, zipCode: zip }
			})
		}
		if (e.target.value[0].toUpperCase() !== e.target.value[0]) {
			const name =
				e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
			return setAddress((pre) => {
				return { ...pre, [changeName]: name }
			})
		}
		setAddress((pre) => {
			return { ...pre, [changeName]: e.target.value }
		})
	}
	const handleChangeAuto = (value) => {
		setAddress((pre) => {
			return { ...pre, street: value }
		})
	}
	const handleSelectAuto = async (value, placeId, suggestion) => {
		setAddress((pre) => {
			return { ...pre, street: suggestion.formattedSuggestion.mainText }
		})
		await geocodeByAddress(value).then((results) => {
			results[0].address_components?.forEach((entry) => {
				if (entry.types[0] === 'administrative_area_level_1') {
					setAddress((pre) => {
						return { ...pre, state: entry.short_name }
					})
				}
				if (entry.types[0] === 'locality') {
					setAddress((pre) => {
						return { ...pre, city: entry.short_name }
					})
				}
				if (entry.types?.[0] === 'postal_code') {
					setAddress((pre) => {
						return { ...pre, zipCode: entry.long_name }
					})
				}
			})
			aptRef.current.focus()
		})
	}
	const handleChangeSelected = (e) => {
		setAddress((pre) => {
			return { ...pre, state: e.value }
		})
	}
	const handleChangePhone = (value) => {
		if (!value) {
			return setAddress((pre) => {
				return { ...pre, phone: '' }
			})
		}
		setAddress((pre) => {
			return { ...pre, phone: value }
		})
	}
	return (
		<form className={classes.inputBoxes} onSubmit={handleSave}>
			<p>*Required fields</p>
			<div style={{ display: 'flex', width: '70%' }}>
				<AddressInput
					title={'First name*'}
					value={address.firstName}
					handleChange={(e) => handleChangeAddress(e, 'firstName')}
					required="required"
				/>
				<span style={{ width: 10 }}></span>
				<AddressInput
					title={'Last name*'}
					value={address.lastName}
					handleChange={(e) => handleChangeAddress(e, 'lastName')}
					required="required"
				/>
			</div>
			{/* <AddressAutoComplete street={address.street} handleChangeAuto={handleChangeAuto} handleSelectAuto={handleSelectAuto} /> */}
			<AddressInput
				title={'Street Adress*'}
				value={address.street}
				handleChange={(e) => handleChangeAuto(e.target.value)}
				required="required"
			/>
			<AddressInput
				title={'Apt, suite,etc.(optional)'}
				value={address.apt}
				handleChange={(e) => handleChangeAddress(e, 'apt')}
				refProp={aptRef}
			/>
			<AddressInput
				title={'City*'}
				value={address.city}
				handleChange={(e) => handleChangeAddress(e, 'city')}
				required="required"
			/>
			<div
				style={{
					display: 'flex',
					width: '70%',
					justifyContent: 'space-between',
				}}
			>
				<div className={classes.stateBox}>
					<label className={classes.stateLabel} htmlFor="stateid">
						<span>State*</span>
					</label>
					<Select
						className={classes.stateSelectContainer}
						value={{ label: address.state }}
						onChange={handleChangeSelected}
						options={stateList}
						isSearchable={true}
						styles={customStyles}
						id="stateid"
					/>
				</div>
				<AddressInput
					title={'Zip code*'}
					value={address.zipCode}
					handleChange={(e) => handleChangeAddress(e, 'zipCode')}
					required="required"
					inputMode="numeric"
					pattern="[0-9]*"
				/>
			</div>
			{emailInput && (
				<AddressInput
					title={'Email*'}
					value={emailValue}
					handleChange={(e) => seteEmailValue(e.target.value)}
					required="required"
				/>
			)}
			{!phoneInput && (
				<div
					className={classes.searchBox}
					onFocus={onFocusChange}
					onBlur={onBlurChange}
				>
					<label
						className={classes.searchLabel}
						htmlFor={'phone'}
						style={isFocus || address.phone ? isFocusStyle : {}}
					>
						<span>Phone number*</span>
					</label>
					<Input
						className={classes.inputBox}
						country="US"
						value={address.phone}
						onChange={handleChangePhone}
						id="phone"
						required
						inputMode="decimal"
						style={error ? { borderColor: 'red' } : {}}
					/>
					{error && <div className={classes.errorMessage}>{error}</div>}
				</div>
			)}
			{!defaultAddress && (
				<label className={classes.checkboxlabel}>
					<input
						type="checkbox"
						className={classes.checkbox}
						value={checked}
						onChange={() => setChecked(!checked)}
						checked={checked}
					/>
					<span>Set as my preferred delivery address</span>
				</label>
			)}
			<div className={classes.buttons}>
				<button className={classes.buttonCancel} onClick={handleCancel}>
					{leftBtnName || 'Cancel'}
				</button>
				<button type="submit" className={classes.buttonSave}>
					{rightBtnName || 'Save'}
				</button>
			</div>
		</form>
	)
}
export default AddressForm

let stateList = [
	{ value: 'AK', label: 'AK' },
	{ value: 'AL', label: 'AL' },
	{ value: 'AR', label: 'AR' },
	{ value: 'AS', label: 'AS' },
	{ value: 'AZ', label: 'AZ' },
	{ value: 'CA', label: 'CA' },
	{ value: 'CO', label: 'CO' },
	{ value: 'CT', label: 'CT' },
	{ value: 'DC', label: 'DC' },
	{ value: 'DE', label: 'DE' },
	{ value: 'FL', label: 'FL' },
	{ value: 'GA', label: 'GA' },
	{ value: 'GU', label: 'GU' },
	{ value: 'HI', label: 'HI' },
	{ value: 'IA', label: 'IA' },
	{ value: 'ID', label: 'ID' },
	{ value: 'IL', label: 'IL' },
	{ value: 'IN', label: 'IN' },
	{ value: 'KS', label: 'KS' },
	{ value: 'KY', label: 'KY' },
	{ value: 'LA', label: 'LA' },
	{ value: 'MA', label: 'MA' },
	{ value: 'MD', label: 'MD' },
	{ value: 'ME', label: 'ME' },
	{ value: 'MI', label: 'MI' },
	{ value: 'MN', label: 'MN' },
	{ value: 'MO', label: 'MO' },
	{ value: 'MS', label: 'MS' },
	{ value: 'MT', label: 'MT' },
	{ value: 'NC', label: 'NC' },
	{ value: 'ND', label: 'ND' },
	{ value: 'NE', label: 'NE' },
	{ value: 'NH', label: 'NH' },
	{ value: 'NJ', label: 'NJ' },
	{ value: 'NM', label: 'NM' },
	{ value: 'NV', label: 'NV' },
	{ value: 'NY', label: 'NY' },
	{ value: 'OH', label: 'OH' },
	{ value: 'OK', label: 'OK' },
	{ value: 'OR', label: 'OR' },
	{ value: 'PA', label: 'PA' },
	{ value: 'PR', label: 'PR' },
	{ value: 'RI', label: 'RI' },
	{ value: 'SC', label: 'SC' },
	{ value: 'SD', label: 'SD' },
	{ value: 'TN', label: 'TN' },
	{ value: 'TX', label: 'TX' },
	{ value: 'UT', label: 'UT' },
	{ value: 'VA', label: 'VA' },
	{ value: 'VI', label: 'VI' },
	{ value: 'VT', label: 'VT' },
	{ value: 'WA', label: 'WA' },
	{ value: 'WI', label: 'WI' },
	{ value: 'WV', label: 'WV' },
	{ value: 'WY', label: 'WY' },
]

const isFocusStyle = {
	top: '4px',
	left: '0px',
	fontSize: '13px',
	padding: '1px 5px',
	backgroundColor: 'white',
	zIndex: 15,
	color: 'black',
}
const customStyles = {
	control: (base) => ({
		...base,
		backgroundColor: 'transparent',
		height: 40,
		minHeight: 40,
	}),
}
