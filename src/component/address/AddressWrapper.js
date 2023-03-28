import { useState } from 'react'
import makeAsyncScriptLoader from 'react-async-script'

const useWrapper = (url, Component) => {
	const [scriptLoaded, setScriptLoaded] = useState(false)
	const LoadingElement = () => {
		return <div style={{ width: '70%', fontSize: 20 }}>Loading...</div>
	}
	const Wrap = () => {
		const AsyncScriptLoader = makeAsyncScriptLoader(url, {
			removeOnUnmount: true,
		})(LoadingElement)
		//cancel map autoComplete
		if (url === '') return <Component />
		if (scriptLoaded) return <Component />
		return (
			<AsyncScriptLoader
				asyncScriptOnLoad={() => {
					setScriptLoaded({ scriptLoaded: true })
				}}
			/>
		)
	}
	return Wrap
}
export default useWrapper
